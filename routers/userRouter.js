const {Router} = require('express')

const router = Router()

const {registerUserController, loginUserController, updateUserController} = require('../controllers/userControllers')
const { protect } = require('../middlewares/authMiddleware')

router.post('/register', registerUserController)
router.post('/login', loginUserController)
router.put('/update/:id', protect, updateUserController)

module.exports = router