const mongoose = require("mongoose")


mongoose.connect(process.env.MONGODB_URL, 
{  useNewUrlParser: true,
useUnifiedTopology: true,
} ,(error,client)=>{
    if(error){
       return console.log(error)
    }

    console.log('connection successfully')
})

