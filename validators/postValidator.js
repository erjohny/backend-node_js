const { body } = require("express-validator")

const postValidator = [
    body("content").notEmpty().withMessage("Содержимое поста не может быть пустым")
]

module.exports = { postValidator }