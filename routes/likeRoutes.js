const express = require("express")
const { likeValidator } = require("../validators/likeValidator")
const { toggleLike } = require("../controllers/likeController")
const validateFields = require("../middleware/validateFields")
const { authenticateToken } = require("../middleware/authMiddleware")

const router = express.Router()

router.post("/", authenticateToken, likeValidator, validateFields, toggleLike);

module.exports = router