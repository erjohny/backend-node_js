const { body } = require("express-validator");

const registerValidator = [
    body(`first_name`).notEmpty().withMessage("Имя обязательно"),
    body(`last_name`).notEmpty().withMessage("Фамилия обязательно"),
    body(`email`).isEmail().trim().escape().withMessage("Неккоректный email"),
    body(`password`).isLength({ min: 6 }).withMessage("Пароль должен быть не менее 6 символов"),
    body(`age`).isInt({ min: 1 }).withMessage("Возраст должен быть положительным числом"),
    body(`avatar`).optional().isString().withMessage("Неверная ссылка на изображение")
]

const loginValidator = [
    body(`email`).isEmail().trim().escape().withMessage("Неккоректный email"),
    body(`password`).isLength({ min: 6 }).withMessage("Пароль обязателен"),
]
module.exports = { registerValidator, loginValidator }