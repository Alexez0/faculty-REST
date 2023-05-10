const sequelize = require("../db");
const {DataTypes} = require("sequelize");


const Course = sequelize.define('course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING}
})

const Teacher = sequelize.define('teacher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
})


const Student = sequelize.define('student', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    number: {type: DataTypes.INTEGER},
})


const Grade = sequelize.define('grade', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    mark: {type: DataTypes.INTEGER, required: true},
    review: {type: DataTypes.STRING, required: true}
    
})


const Student_course = sequelize.define('student_course', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING}
})


Teacher.hasOne(Course)
Course.belongsTo(Teacher)

Teacher.hasMany(Grade)
Grade.belongsTo(Teacher)

Student.hasMany(Grade)
Grade.belongsTo(Student)


Student.belongsToMany(Course, {through: Student_course})
Course.belongsToMany(Student, {through: Student_course})


module.exports = {
    Course, Teacher, Student, Grade, Student_course
}


