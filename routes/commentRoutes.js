const express = require('express');
const { commentValidator } = require("../validators/commentValidator")
const { addComment } = require("../controllers/commentController")
const validateFields = require("../middleware/validateFields")
const { authenticateToken } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", authenticateToken, commentValidator, validateFields, addComment)


module.exports = router;