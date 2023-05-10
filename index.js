const express =require('express')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/Model')
const router = require('./routes/mainRouter')
const port = 8000


const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)

const start = async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync().then(()=>{
            console.log('Connected to database!')})
        app.listen(port, ()=>{
            console.log(`Server has been opened on port ${port}`)
        })
    }
    catch (e){
        console.log(e)
    }
}

start()
