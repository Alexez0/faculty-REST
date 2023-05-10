const {Student, Grade, Student_course, Course} = require("../models/Model");

class GradeController {

    async createGrade(req, res, next) {
        const {number, review, mark} = req.body
        const studentId = await Student.findOne({where: {id: req.user.id}})
        if (studentId !== req.user.id) {
            return res.json({message: `Student has not registered on this course`})
        }

        const student = await Student.findOne({where: {number: number}})
        if (!student) {
            return res.status(400).json({message: `Student not found`})
        }
        const courses = await Student_course.findAll({where: {studentId: student.id, courseId: req.user.id}})
        const grade = await Grade.create({mark, review, teacherId: req.user.id, studentId: student.id})
        await Student_course.update({status: `passed`}, {where: {studentId: student.id, courseId: req.user.id}})
        return res.json(grade)

    }

    async showGrade(req, res) {
        const grade = await Grade.findAll()
        return res.json(grade)
    }


    async update(req, res) {
        const {mark, review} = req.body
        const updatedGrade = Grade.update({mark: mark, review: review}, {where: {teacherId: req.user.id}})
        return res.json(updatedGrade)
    }


}


module.exports = new GradeController()

