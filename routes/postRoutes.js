const express = require('express');
const { postValidator } = require('../validators/postValidator');
const { createPost } = require('../controllers/postController');
const validateFields = require('../middleware/validateFields');
const { authenticateToken } = require('../middleware/authMiddleware');
const { getPosts } = require("../controllers/postController")

const router = express.Router();

router.post('/', authenticateToken, postValidator, validateFields, createPost);
router.get("/", getPosts)

module.exports = router;