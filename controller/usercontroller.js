const user = require('../Model/userModel')

const jsontoken = require('jsonwebtoken')


// register users

exports.registerController = async(req,res)=>{
    const {username, email, password} = req.body
    try {
        const existingUser = await user.findOne({email})

        if(existingUser){
            res.status(402).json('Account exists!')
        } 
        else{
            const newUser = new user({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)

            
        }
    } catch (error) {
        res.status(402).json(error)
        
    }
}

// login 

exports.loginController = async(req,res)=>{
    const {email,password} = req.body

    try {
        const existingUser = await user.findOne({email,password})
        if(existingUser){
            const token = jsontoken.sign({userId:existingUser._id},process.env.SECRETKEY)
            res.status(200).json({existingUser,token})
            
        }else{
            res.status(405).json('Invalid crednetials')
        }
    } catch (error) {
        res.status(401).json(error)
        
    }
}


