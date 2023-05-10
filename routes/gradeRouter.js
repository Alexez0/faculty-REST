const Router = require('express')
const router = new Router()
const gradeController = require('../controllers/gradeController')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/create', authMiddleware, gradeController.createGrade)
router.get('/show', authMiddleware, gradeController.showGrade)
router.put('/update', authMiddleware, roleMiddleware('teacher'), gradeController.update)


module.exports = router