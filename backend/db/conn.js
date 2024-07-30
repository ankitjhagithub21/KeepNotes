const mongoose = require('mongoose')

const connectDb = async() =>{
   try{
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connnected.")
   }catch(error){
    console.log(error)
   }
}

module.exports = connectDb