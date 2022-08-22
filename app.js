require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('cors');
const { login, createUser, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const handleErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://localhost:3001',
    'https://localhost:3000',
  ],
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signout', logout);

app.use(auth);
app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.all('*', () => {
  throw new NotFoundError('Страница не найдена');
});

mongoose.connect('mongodb://localhost:27017/moviesdb', { useNewUrlParser: true, family: 4 });

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = { app };
