const {Sequelize} = require("sequelize");
module.exports = new Sequelize(
    "rest", "root", "root",{
        dialect: "mysql",
        host: "localhost"
    }
)
