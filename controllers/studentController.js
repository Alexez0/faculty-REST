const {Student} = require('../models/Model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = 'key'
const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, secretKey, {expiresIn: '2h'})

}

class studentController {
    async registration(req, res) {
        const {name, email, password} = req.body
        const role = 'student'
        if (!name || !email || !password) {
            return res.status(400).json({message: `Incorrect input`})
        }
        const candidate = await Student.findOne({where: {email}})
        if (candidate) {
            return res.status(400).json({message: `User with email ${email} is already exists`})
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        }

        const number = getRandomNumber(500, 10000)


        const hashPassword = await bcrypt.hash(password, 4)
        const student = await Student.create({name, password: hashPassword, email, number})
        const token = generateJwt(student.id, student.email, role)
        return res.json({token})

    }

    async login(req, res) {
        const role = 'student'
        const {email, password} = req.body
        const student = await Student.findOne({where: {email}})
        if (!student) {
            return res.status(400).json({message: `User with email ${email} not found`})
        }
        let comparePassword = bcrypt.compareSync(password, student.password)
        if (!comparePassword) {
            return res.status(400).json({message: `Password is not compare`})
        }
        const token = generateJwt(student.id, student.email, role)

        return res.json({token})
    }

}

module.exports = new studentController()
