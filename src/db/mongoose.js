const mongoose = require("mongoose")


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', 
{  useNewUrlParser: true,
useUnifiedTopology: true,
} ,(error,client)=>{
    if(error){
       return console.log(error)
    }

    console.log('connection successfully')
})
