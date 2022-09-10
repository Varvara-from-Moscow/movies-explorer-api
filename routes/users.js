const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateСurrentUser,
  getСurrentUser,
} = require('../controllers/users');

router.get('/users/me', getСurrentUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), updateСurrentUser);

module.exports = router;
