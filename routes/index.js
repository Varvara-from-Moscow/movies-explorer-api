const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signout', logout);

router.use(auth);

router.use(require('./users'));
router.use(require('./movies'));

router.all('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = { router };
