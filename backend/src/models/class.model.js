import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
    subject : {
        type: String,
        lowercase : true
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher' 
    }
},{timestamps:true})

const classSchema = new mongoose.Schema({
    grade:{
        type:Number,
        required:true,
        unique:true
    },
    subjects:[subjectSchema],

    studentList: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        
        
    }],


    studentFees : {
        type: Number,
        required: true
    },

    year:{
        type: String,
        required: true,
        

    }
    
},{timestamps:true})


export const Class = mongoose.models.Class || mongoose.model('Class',classSchema)