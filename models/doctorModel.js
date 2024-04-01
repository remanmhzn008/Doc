mongoose=require("mongoose")

const DoctorSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true
    },
    hashed_password:{
        type:String,
        required:true,
    },
    degree:{
    type:Datatype.STRING,
    AllowNull:false
    },
    yearOfExperience:{
    type:Datatype.STRING,
    AllowNull:false
    },
    role:{
        type:Number,
        // 0 is user and 1 is admin
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    salt:String
},{timestamps:true})



module.exports=mongoose.model("Doctor",DoctorSchema)