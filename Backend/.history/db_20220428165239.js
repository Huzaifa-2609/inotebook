const mongoose= require("mongoose");
const mongoUri= "mongodb://localhost:27017/contactDance";
const connectToMongo=()=>{
    mongoose.connect(mongoUri,()=>{
        console.log("connnected to mongoose successfully");
    })
}
module.exports=connectToMongo;