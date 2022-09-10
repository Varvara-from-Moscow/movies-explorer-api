const Reg = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const validateURL = (value) => {
  if (value !== value.match(Reg).join('')) {
    throw new Error('Ссылка не прошла валидацию');
  }
  return value;
};

const {
  Mongodb = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
} = process.env;

module.exports = {
  Reg,
  validateURL,
  Mongodb,
  PORT,
};
