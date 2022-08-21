const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateСurrentUser,
  getСurrentUser,
  getUsers,
} = require('../controllers/users');

router.get('/users/me', getСurrentUser);

router.get('/users/all', getUsers);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateСurrentUser);

module.exports = router;
