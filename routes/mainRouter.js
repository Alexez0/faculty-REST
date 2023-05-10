const Router = require('express')
const router = new Router()
const teacherRouter = require('./teacherRouter')
const studentRouter = require('./studentRouter')
const courseRouter = require('./courseRouter')
const gradeRouter = require("./gradeRouter");


router.use('/teacher', teacherRouter)
router.use('/student', studentRouter)
router.use('/course', courseRouter)
router.use('/grade', gradeRouter)


module.exports = router