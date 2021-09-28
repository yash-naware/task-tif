const express =require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')


router.post('/users', async(req,res) => {           
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch(e){
        res.status(400).send(e)

    }

})

router.post('/users/login',async(req,res)=>{  
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})

    }catch(e){
        res.status(400).send(e)

    }
})

router.get('/users',auth,async(req,res)=>{  
    try{
        const users = await User.find({})
        res.send(users)

    }catch(e){
        res.status(500).send(e)

    }
})

router.get('/users/:id', auth ,async (req,res)=>{              
    const _id = req.params.id

    try{
        const user =await User.findById(_id)

        if(!user){
             return res.status(404).send()
        }
        res.send(user)

    }catch(e){
        res.status(500).send()
    }

})

router.patch('/users/:id',auth ,async (req,res)=>{
    
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','passoword']
    const isValidoperation = updates.every((update)=> allowedUpdates.includes(update))
    
    if(!isValidoperation){
        return res.status(400).send({error:'invalid updates'})
    }
    
    try{
        // const user =  await User.findById(req.params.id)
        // updates.forEach((update) => user[update] = req.body[update])

        // await user.save()
        const user = await User.findByIdAndUpdate(req.params.id, req.body,{new :true , runValidators:true})
        
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.send(400).send(e)

    }

})

// router.post('/users/logout',auth ,async(req,res) => {           

//     try{
//         req.user.tokens  =req.user.token.filter((token)=>{
//             return token.token  !== req.token
//         })
//         await req.user.save()
//         res.send()
//     } catch(e){
//         res.status(500).send(e)

//     }

// })

module.exports = router