import { Class } from "../models/class.model.js";
import { Student } from "../models/student.model.js";
import { savetoCloudinary } from "../utils/cloudinary.js";
import { validateDOB, ValidatePhone } from "../utils/validators.js";
import fs from 'fs'
import { apiResponse } from "../utils/apiResponse.js";

const addStudent = async (req,res) => {
    try {
        const { name, gender, phone, dob, rollNo, grade,feesPaid} = req.body;

        if (
           !name ||
           !gender ||
           !phone ||
           !dob ||
           !rollNo ||
           !grade ||
           !feesPaid
        ) {
            req.file && fs.unlinkSync(req.file.path)
            return res.status(400).json({ message: "All fields are required" });
        }

        // check if student already exists
        const existingStudent = await Student.findOne({ rollNo });
        
        if (existingStudent) {
            req.file && fs.unlinkSync(req.file.path)
            return res.status(400).json({ message: "Student already exists with this roll number" });
        }

        if(grade > 12){
            req.file && fs.unlinkSync(req.file.path)
            return res.status(400).json({ message: "Invalid grade entered. Grade should be between 1 and 12" });
        }
        //validations

        if(!ValidatePhone(Number(phone))){
            req.file && fs.unlinkSync(req.file.path)
            return res.status(400).json({ message: "Invalid phone number format" });
        }

        if(!validateDOB(dob).valid){
            req.file && fs.unlinkSync(req.file.path)
            return res.status(400).json({ message: validateDOB(dob).message });
        }

        if(Number(rollNo) < 999 || Number(rollNo) > 9999){
            req.file && fs.unlinkSync(req.file?.path)
            return res.status(400).json({ message: "Invalid roll number. Roll number should be between 1000 and 9999" });
        }

        const localfilePath = req.file && req.file.path 

        if(localfilePath){
            var profile = await savetoCloudinary(localfilePath)
        }

        const classAssigned = await Class.findOne({grade:grade.toLowerCase()})


        
        if(!classAssigned){
            req.file && fs.unlinkSync(req.file?.path)
            return res.status(400).json({ message: "Class not found for this grade" });
        }

        if(classAssigned?.studentList.length >= 20){
            req.file && fs.unlinkSync(req.file?.path)
            return res.status(400).json({ message: "Class is full" });
        }


        const newStudent = await Student.create({
            name : name.toLowerCase(),
            gender : gender.toLowerCase(),
            phone : Number(phone),
            dob : new Date(dob),
            rollNo : Number(rollNo),
            class : classAssigned._id,
            feesPaid : Number(feesPaid),
            photo: profile?.url,
            grade:Number(grade)
        })

        const createdStudent =  await Student.findById(newStudent._id)

        if (!createdStudent) {
            req.file && fs.unlinkSync(req.file.path)
            return res.status(404).json({ message: "Error creating student" });
        }


       const updatedClass =  await Class.findOneAndUpdate({grade:grade.toLowerCase()},{

            $push: {
                studentList: createdStudent._id
            },
            $new:true

        })
        if(!updatedClass){
            return res.status(404).json({ message: "Error updating class" });
        }

        return res.status(200).json(new apiResponse(201, "Student added successfully", createdStudent));

       
    } catch (error) {
        console.error(error);
        req.file && fs.unlinkSync(req.file.path)
        return res.status(400).json({ message: error.message });
        
    }

}

const getAllStudents = async(req,res) => {
    try {
        const students = await Student.find();
        if(!students.length){
            return res.status(404).json(new apiResponse(201,"No students found", 0));
        }
        //sort the students by there grade
        students.sort((a,b) => a.grade - b.grade)
        return res.status(200).json(new apiResponse(201,"data fetched successfully", students));


        
    } catch (error) {
        return res.status(400).json({ message: error.message });
        
    }

}

const getStudentById = async (req,res) => {
    try {

        const student = await Student.aggregate([
            { $match: { rollNo: Number(req.params.rollno )} },
            {
                $lookup: {
                    from: "classes",
                    localField: "class",
                    foreignField: "_id",
                    as: "classDetails",
                   
                },
                
        
            },
            {
                $lookup:{
                    from: "teachers",
                    localField: "classDetails.subjects.teacher",
                    foreignField: "_id",
                    as: "teacherDetails",
                }
            },
            {
                $project:{
                    _id:1,
                    rollNo:1,
                    name:1,
                    gender:1,
                    phone:1,
                    dob:1,
                    photo:1,
                    feesPaid:1,
                    grade:1,
                    classDetails:{
                        _id:1,
                        grade:1,
                        year:1,
                        studentFees:1,
                        
                    },
                    teacherDetails:{
                        _id:1,
                        name:1,
                        photo:1,
                        assignedSubject:1


                    }
                }
            }
           
           
        ])

        console.log(student);
        

        if(student.length==0) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json(new apiResponse(201,"data fetched successfully", student[0]));
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
        
    }

}

const updateStudent = async (req,res) => {

    try {
        const rollNo = Number(req.params.rollno)

        const student = await Student.findOne({rollNo : rollNo})

        if(!student){
            return res.status(404).json({ message: "Student not found" });
        }

        const { name, gender, phone, dob, roll, grade, feesPaid } = req.body;
        
        if(!name || !gender || !phone || !dob || !roll || !grade || !feesPaid) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        if(grade > 12){
            return res.status(400).json({ message: "Invalid grade entered. Grade should be between 1 and 12" });
        }
        if(!ValidatePhone(Number(phone))){
            return res.status(400).json({ message: "Invalid phone number format" });
        }
        if(!validateDOB(dob).valid){
            return res.status(400).json({ message: validateDOB(dob).message });
        }
        if(Number(roll) < 999 || Number(roll) > 9999){
            return res.status(400).json({ message: "Invalid roll number. Roll number should be between 1000 and 9999" });
        }


        //get previous class and remove 

        const prevAssignedClass = await Class.findByIdAndUpdate(student.class,{
            $pull: {
                studentList: student._id
            }
        },
    {$new : true})
        

        //add to new class

        const assignedClass = await Class.findOne({grade:grade})
        if(!assignedClass){
            return res.status(400).json({ message: "Class not found for this grade" });
        }

        await Class.findOneAndUpdate({grade:grade},{
            $push: {
                studentList: student._id
            },
            $new:true
        })

        const updatedStudent = await Student.findByIdAndUpdate(student._id,{
            $set:{
                name: name.toLowerCase(),
                gender: gender.toLowerCase(),
                phone: Number(phone),
                dob: new Date(dob),
                rollNo: Number(roll),
                class: assignedClass._id,
                feesPaid: Number(feesPaid),
                grade:Number(grade)
            }
        })

        if(!updatedStudent){
            return res.status(404).json({ message: "Error updating student" });
        }
        return res.status(200).json(new apiResponse(201,"Student updated successfully", updatedStudent));



    } catch (error) {
        return res.status(400).json({ message: error.message });
        
    }

}

const updateStudentProfile = async (req,res) => {
    try {
        const rollNo = Number(req.params.rollno)
        const student = await Student.findOne({rollNo : rollNo})
        if(!student){
            req.file && fs.unlinkSync(req.file?.path)
            return res.status(404).json({ message: "Student not found" });
        }
        const localpath = req.file && req.file?.path
        if(!localpath){
            return res.status(400).json({ message: "Please upload a profile picture" });
        }

        if(localpath){
            var profile = await savetoCloudinary(localpath)   
        }
       const updatedStudent =  await Student.findByIdAndUpdate(student._id,{
            $set:{
                photo: profile?.url
            }
        },
    {$new : true})

     const newStudent = await Student.findById(updatedStudent._id)
    
        if(!newStudent){
            return res.status(404).json({ message: "Error updating student profile" });
        }

        return res.status(200).json(new apiResponse(201,"Student profile updated successfully", newStudent));

        
    } catch (error) {
        req.file && fs.unlinkSync(req.file?.path)
        return res.status(400).json({ message: error.message });
        
    }

}



const deleteStudent = async (req,res) => {
    try {
        const student = await Student.findOneAndDelete({rollNo:Number(req.params.rollno)});
        if(!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const updatedClass = await Class.findByIdAndUpdate(student.class,{
            $pull: {
                studentList: student._id
            },
            $new:true
        })



        return res.status(200).json(new apiResponse(201,"Student deleted successfully", student));
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
        
    }

}


export{


    addStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    updateStudentProfile
 
}