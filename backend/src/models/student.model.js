import mongoose from "mongoose";

const studentschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
        
    },
    gender:{
        type: String,
        required: true,
        enum: ["male", "female","transgender"]
    },
    dob:{
        type: Date,
        required: true,
     
    },
    phone:{
        type:Number,
        required: true,
    },
    photo:{
        type:String,
        default: "https://murrayglass.com/wp-content/uploads/2020/10/avatar-2048x2048.jpeg"
        
      
    },
    class : {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    grade:{
        type:Number,
        required: true,
        min: 1,
        max: 12,
       
    },
    rollNo:{
      type: Number,
      required: true,
      unique: true
    },
  
    feesPaid:{
        type:Number,
        default: 0
    },

   

       
     
},{timestamps:true})



export const Student = mongoose.models.Student || mongoose.model("Student", studentschema)