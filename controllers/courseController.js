const {Course, Teacher, Student, Student_course} = require("../models/Model");
const {where} = require("sequelize");

class courseController {
    async createCourse(req, res) {
        const {id, name} = req.body
        const teacher = await Course.findOne({where: {teacherId: id}})
        if (teacher) {
            return res.status(400).json({message: `Course with this teacher is already exists`})
        }
        const course = await Course.create({name, teacherId: id})
        return res.json(course)
    }

    async enterCourse(req, res) {
        const {courseName, number} = req.body
        if (!courseName || !number) {
            return res.status(400).json({message: `Incorrect input`})
        }
        const status = 'in progress'
        const course = await Course.findOne({where: {name: courseName}})
        if (!course) {
            return res.status(400).json({message: `Course not found`})
        }
        const student = await Student.findOne({where: {number: number}})
        if (!student) {
            return res.status(400).json({message: `Student not found`})
        }
        const enteredCourse = await Student_course.create({status, studentId: student.id, courseId: course.id})

        return res.json(enteredCourse)

    }

    async deleteCourse(req, res) {
        const {id} = req.body
        Course.destroy({where: {id: id}})
        return res.json({message: `Course with id ${id} has been removed`})
    }

    async getCourses(req, res) {
        const course = await Course.findAll()
        const result = []
        for (let i = 1; i < course.length + 1; i++) {
            const courses = await Course.findByPk(i)
            const teachers = await Teacher.findByPk(i)
            result.push({course: courses.dataValues.name, teacher: teachers.dataValues.name})

        }
        return res.json(result)
    }
}


module.exports = new courseController()