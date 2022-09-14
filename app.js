require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { router } = require('./routes');
const handleErrors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { Mongodb, PORT } = require('./utils/const');
const { limiter } = require('./middlewares/limiter');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);
/*
app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'https://localhost:3001',
    'https://localhost:3000',
    'http://moviesapp.nomoredomains.sbs/,
    'https://moviesapp.nomoredomains.sbs/,
  ],
}));*/

app.options('*', cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадет');
  }, 0);
});

mongoose.connect(`${Mongodb}`, { useNewUrlParser: true, family: 4 });

app.use(limiter);
app.use(helmet());
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = { app };
