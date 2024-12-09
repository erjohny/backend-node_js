const express = require(`express`);
const { registerValidator, loginValidator } = require('../validators/userValidator')
const { register, login, deleteUser, getUsers } = require('../controllers/authController')
const validateFields = require("../middleware/validateFields")

const router = express.Router()

router.post('/register', registerValidator, validateFields, register)
router.post('/login', loginValidator, validateFields, login)
router.delete('/:id', deleteUser)
router.get('/', getUsers)

module.exports = router;