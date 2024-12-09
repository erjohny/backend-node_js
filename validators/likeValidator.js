const { body } = require("express-validator")

const likeValidator = [
    body("postId").isInt().withMessage("ID поста должен быть числом")
]

module.exports = { likeValidator };