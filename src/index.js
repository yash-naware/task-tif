const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Student = require('./models/student')
const { ObjectId } = require('bson')
const userRouter = require('./routers/user')
const studentRouter = require('./routers/student')

const app = express()

const port = process.env.PORT ||3000 

// app.use((req,res,next)=> {
//     res.status(500).send('unable to load anything')

// })

app.use(express.json())

app.use(userRouter)
app.use(studentRouter)


app.listen(port,()=>{
    console.log('server is up on port', + port)

}) 
