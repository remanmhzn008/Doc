
module.exports = (sequelize,Datatype) =>{
    const doctor = sequelize.define("doctor",{
        name:{type:Datatype.STRING,AllowNull:false},
        password:{type:Datatype.STRING,AllowNull:false},
        email:{type:Datatype.STRING,AllowNull:false},
        specialization:{type:Datatype.STRING,AllowNull:false},
        degree:{type:Datatype.STRING,AllowNull:false},
        yearOfExperience:{type:Datatype.STRING,AllowNull:false}
    })
    return doctor;
}