const { body } = require("express-validator")

const commentValidator = [
    body("postId").isInt().withMessage("Id поста должен быть числом"),
    body("comment").notEmpty().withMessage("Комментария не может быть пустым")
]

module.exports = { commentValidator }