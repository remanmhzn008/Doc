const mongoose = require("mongoose");

const doctorSchema=new mongoose.Schema({
    name:
    {
        type:Datatype.STRING,
        AllowNull:false
    },
    password:
    {
        type:Datatype.STRING,
        AllowNull:false
    },
    email:
    {
        type:Datatype.STRING,
        AllowNull:false
    },
    specialization:
    {
        type:Datatype.STRING,
        AllowNull:false
    },
    degree:
    {
        type:Datatype.STRING,
        AllowNull:false
    },
    yearOfExperience:
    {
        type:Datatype.STRING,
        AllowNull:false
    }
})

const doctorModel=mongoose.model("doctor",doctorSchema)
module.exports = doctorModel;