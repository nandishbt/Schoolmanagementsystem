import { Student } from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import { apiResponse } from "../utils/apiResponse.js";

const getTotalStudents = async(req,res) =>{

    try {
        const students = await Student.find({});

        return res.status(200).json(new apiResponse(201,"data fetched successfully", students.length));
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
        
    }

   

}

const getTotalTeachers = async(req,res) =>{
    try {
        
        const teachers = await Teacher.find({});
        return res.status(200).json(new apiResponse(201,"data fetched successfully", teachers.length));
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
        
    }
    
}

const getTotalFees = async(req,res) =>{
    try {
        const students = await Student.find({})

        if(students.length === 0){
            return res.status(404).json(new apiResponse(201,"data fetched successfully", 0));
        }

        const fees = students.reduce((acc,student) => acc + student.feesPaid, 0);

        return res.status(200).json(new apiResponse(201,"data fetched successfully", fees));
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
        
    }
    
}

const getTotalSalary = async(req,res) =>{
    try {
        const teachers = await Teacher.find({});
        if(teachers.length === 0){
            return res.status(404).json(new apiResponse(201,"data fetched successfully", 0));
        }
        
        const salary = teachers.reduce((acc,teacher) => acc + teacher.salary, 0);
        
        return res.status(200).json(new apiResponse(201,"data fetched successfully", salary));
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
        
    }
    
}

export {
    getTotalStudents,
    getTotalTeachers,
    getTotalFees,
    getTotalSalary
 
}
