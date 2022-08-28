require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const ConflictError = require('../errors/ConflictError');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((userData) => res.status(201).send({
      email: userData.email,
      id: userData._id,
      name: userData.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Введены некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Такой Email уже существует'));
      } else { next(err); }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY', { expiresIn: '7d' });
      return res
        .cookie('jwt', token, { httpOnly: true, sameSite: true })
        .send({ token });
    })
    .catch(() => {
      next(new AuthError('Ошибка доступа'));
    });
};

module.exports.getСurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка, пользователь не найден');
      }
      return res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректныe данные'));
      } else { next(err); }
    });
};

module.exports.updateСurrentUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка, пользователь не найден');
      }
      return res.send(user);
    }).catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким адресом уже существует'));
      } else { next(err); }
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};
