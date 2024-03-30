const mongoose = require("mongoose");
const colors = require("colors");

mongoose.set('strictQuery',false)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log(`Mongodb connected `.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
