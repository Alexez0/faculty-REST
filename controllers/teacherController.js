const {Teacher} = require('../models/Model.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = 'key'
const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, secretKey, {expiresIn: '2h'})

}

class teacherController {
    async registration(req, res) {
        const role = 'teacher'
        const {name, email, password} = req.body
        if (!name || !email || !password) {
            return res.status(400).json({message: `Incorrect input`})
        }
        const candidate = await Teacher.findOne({where: {email}})
        if (candidate) {
            return res.status(400).json({message: `User with email ${email} is already exists`})
        }
        const hashPassword = await bcrypt.hash(password, 4)
        const teacher = await Teacher.create({name, password: hashPassword, email})
        const token = generateJwt(teacher.id, teacher.email, role)
        return res.json({token})

    }

    async login(req, res) {
        const role = 'teacher'
        const {email, password} = req.body
        const teacher = await Teacher.findOne({where: {email}})
        if (!teacher) {
            return res.status(400).json({message: `User with email ${email} not found`})
        }
        let comparePassword = bcrypt.compareSync(password, teacher.password)
        if (!comparePassword) {
            return res.status(400).json({message: `Password is not compare`})
        }
        const token = generateJwt(teacher.id, teacher.email, role)

        return res.json({token})

    }
}

module.exports = new teacherController()
