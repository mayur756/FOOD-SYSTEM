import mongoose from "mongoose";

const connecteddb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected succesfully...");
    } catch (error) {
       console.log('database connction failed..'); 
    }
}

export default connecteddb;