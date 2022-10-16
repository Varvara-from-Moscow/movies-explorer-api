const mongoose = require('mongoose');
const { Reg } = require('../utils/const');

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
    validate: Reg,
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    validate: Reg,
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле, обязательно для заполнения'],
    validate: Reg,
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
