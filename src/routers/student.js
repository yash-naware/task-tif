const express =require('express')
const router = new express.Router()
const Student = require('../models/student')
const auth = require('../middleware/auth')


router.post('/students', auth ,async (req,res) => {                  
    // const student = new Student(req.body)
    const student = new Student({
        ...req.body,
        userid: req.user._id
    })

    try{
        await student.save()
        res.status(201).send(student)

    }catch(e){
        res.status(400).send(e)

    }
})

router.get('/students',auth, async (req,res)=>{     
    try{
        const student= await Student.find({})
        res.send(student)

    }catch{
        res.status(500).send()

    }
    
})

router.get('/students/:id', auth ,async (req,res)=>{               
    const _id = req.params.id

    try{
        const student =await  Student.findById(_id)
        if(!student){
            return res.status(404).send()
        }
        res.send(student)
    }catch(e){
        res.status(500).send()
    }

})

router.patch('/students/:id',auth,async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname','lastname','age','schoolname']
    const isValidoperation = updates.every((update)=> allowedUpdates.includes(update))
    
    if(!isValidoperation){
        return res.status(400).send({error:'invalid updates'})
    }
    
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body,{new :true, runValidators:true})
        
        if(!student){
            return res.status(404).send()
        }
        res.send(student)
    }catch(e){
        res.send(400).send(e)

    }
    

})
module.exports = router