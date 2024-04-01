const Doctor=require('../models/doctorModel')
const Token=require("../model/Tokenmodel")
const sendEmail=require("../sendEmail")
const crypto=require("crypto")
const jwt=require('jsonwebtoken')
const expressjwt=require('express-jwt')

exports.register=async(req,res)=>{
    // destructuring
    const {username,email,password}=req.body
    const user=await User.findOne({email:email})
    if(user){
       return res.status(400).json({error:"User already exist"})
    }
    let register=new User({
        username:username,
        email:email,
        password:password,
    })
    register=await register.save()
    if(!register){
        return res.status(400).json({error:"Something went wrong"})
    }
    let token=await Token({
        token:crypto.randomBytes(16).toString('hex'),
        user:register._id
    })
    token =await token.save()
    if(!token){
        return res.status(400).json({error:"Something went wrong"})
    }
    // send verification mail 
    const url=`http://localhost:3001/user/verification/${token.token}`
    sendEmail({
        from:"noreply@gmail.com",
        to:user.email,
        object:"Verification Mail",
        text:"Click the Following link"+url,
        html:`<a href=${url}> <button>Click this link </button> </a>`

    })

    res.send(register)
}

exports.verifyuser=async(req,res)=>{
    let token=await Token.findOne({token:req.params.id})
    if(!token){
        return res.status(400).json({error:"Invalid Token"})
    }
    let verify=await User.findById(token.user)
    if(!verify){
        return res.status(400).json({error:"User associated with token not found"})
    }
    // check if the user is verified or not 
    if(verify.isVerified){
        return res.status(400).json({error:"User has already been verified"})
    }
    verify.isVerified=true
    verify=await verify.save()
    if(!verify){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"User verification successful"})
}

exports.resendverification=async(req,res)=>{
    const {email}=req.body
    let user=await User.findOne({email:email})
    if(!user){
        return res.status(400).json({error:"user not found"})
    }
    if(user.isVerified){
        return res.status(400).json({error:"User has been already verified"})
    }
    let token=new Token({
        token:crypto.randomBytes(16).toString('hex'),
        user:user._id
    })
    token =await token.save()
    if(!token){
        return res.status(400).json({error:"Something went wrong"})
    }
    // send verification mail 
    const url=`http://localhost:3000/user/verification/${token.token}`
    sendEmail({
        from:"noreply@gmail.com",
        to: email,
        object:"Verification Mail",
        text:"Click the Following link"+url,
        html:`<a href=${url}> <button>Click this link </button> </a>`

    })
    res.send({register})
}

exports.getalluser=async(req,res)=>{
    let user=await User.find()
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    return res.send(user)
}

exports.forgetPassword=async(req,res)=>{
    let user= await User.findOne({email:req.body.email})
    if(!user){
        return res.status(400).json({error:"Email Not Found"})
    }
    let token=new token({
        token:crypto.randomBytes(16).toString('hex'),
        user:user._id
    })
    token=await token.save()
    if(!token){
        return res.status(400).json({error:"Something went wrong"})
    }

    const url=`http://localhost:3000/user/resetpassword/${token.token}`
    sendEmail({
        from:"noreply@gmail.com",
        to: email,
        subject:"Reset Password Link",
        text:"Click the Following link"+url,
        html:`<a href=${url}> <button>Click this link </button> </a>`

    })
    res.send({message:"Password reset link sent"})

}  

exports.resetPassword=async(req,res)=>{
    let token=await Token.findOne({token:req.params.id})
    if(!token){
        return res.status(400).json({error:"Token Invalid"})
    }
    let user =await User.findById(token.user)
    if(!user){
        return res.status(400).json({error:"User not found"})
    }
    user.password=req.body.password
    user=await user.save()
    if(!user){
        return res.status(400).json({error:"Something went wrong"})
    }
    res.send({message:"Password Updated"})
}

exports.singleuserdetail=async(req,res)=>{
    let user = await User.findById(req.params.id)
    if(!user){
        return res.status(400).json({error:"User Not Found"})
    }
    res.send(user)
}

exports.updateuser=async(req,res)=>{
    let user=await User.findById(req.params.id,{
        username:req.body.username
    })
    if(!user){
        return res.status(400).json({error:"User not found"})
    }
    user=await user.save()
    res.json({message:"User updated"})
}

exports.deleteuser=async(req,res)=>{
    let user=await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.status(400).json({error:"User not found"})
    }

    return res.json({success:"User deleted"})
}

exports.signIn=async(req,res)=>{
const {email,password}=req.body
let user=await User.findOne({email:email})
if(!user){
    return res.status(400).json({error:"User not found"})
}
// check password
    if(!user.authenticate(password)){
        return res.status(400).json({error:"Password Incorrect"})
    }
    if(!user.isVerified){
        return res.status(400).json({error:"User not verified, Please verify"})
    }
    // generate token
    let token=jwt.sign({user:user._id,role:user.role},process.env.JWT_SECRET)
    // storing in cookie
    res.cookie('mycookie',token,{expire:Date.now()+86400})
    // sending information to frontend
    const{_id,username,role}=user
    res.send({token,user:{
        _id,username,email,role
    }})
}

exports.signout=async(req,res)=>{
    res.clearCookie('mycookie')
    res.send({message:"Signed out Successfully"})
}

exports.authorize=expressjwt({ secret: "process.env.JWT_SECRET", algorithms: ["HS256"] })