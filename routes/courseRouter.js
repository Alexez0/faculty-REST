const Router = require('express')
const router = new Router()
const courseController = require('../controllers/courseController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


router.get('/', authMiddleware, roleMiddleware('student'), courseController.getCourses)
router.post('/create', roleMiddleware('teacher'), courseController.createCourse)
router.post('/enter', roleMiddleware('student'), courseController.enterCourse)
router.delete('/delete', roleMiddleware('teacher'), courseController.deleteCourse)


module.exports = router