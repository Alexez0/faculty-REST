const Router = require('express')
const router = new Router()
const teacherController = require('../controllers/teacherController')

router.post('/registration', teacherController.registration)
router.post('/login', teacherController.login)


module.exports = router