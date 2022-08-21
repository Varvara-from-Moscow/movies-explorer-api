const mongoose = require('mongoose');
const { validateURL } = require('../utils/const');

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
  },
  director: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле, обязательно для заполнения'],
  },
  year: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
  },
  description: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
  },
  image: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    validate: validateURL,
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    validate: validateURL,
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    validate: validateURL,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
