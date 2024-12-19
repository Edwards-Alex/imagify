import mongoose from "mongoose";

const connectDB = async () => {

    // show message when connect successfully.
    mongoose.connection.on('connected', ()=>{
        console.log("Database Connected.")
    })
    
    //connect database 
    await mongoose.connect(`${process.env.MONGODB_URL}/imagfy`)
}

export default connectDB