import Teacher from "../models/teacher.model.js";
import { savetoCloudinary } from "../utils/cloudinary.js";
import {
  validateDOB,
  validateEmail,
  ValidatePhone,
} from "../utils/validators.js";
import fs from "fs";
import {apiResponse} from "../utils/apiResponse.js";
import { Class } from "../models/class.model.js";

const addTeacher = async (req, res) => {
  try {
    const { name, gender, phone, email, dob, assignedSubject, salary } =
      req.body;

    if (
      !name ||
      !gender ||
      !phone ||
      !email ||
      !dob ||
      !assignedSubject ||
      !salary
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const teacher = await Teacher.findOne({ email });

    if (teacher) {
      return res
        .status(400)
        .json({ message: "Teacher already exists with this email" });
    }

    //validate all data

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!ValidatePhone(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    if (!validateDOB(dob).valid) {
      return res.status(400).json({ message: validateDOB(dob).message });
    }

    // save photo to cloudinary

    const localFilepath = req.file && req.file.path;

    if (!localFilepath) {
      console.log("No Photo Provided");
    }

    if (localFilepath) {
      var profile = await savetoCloudinary(localFilepath);
      fs.unlinkSync(localFilepath); 

    }

    // create new teacher

    const createdTeacher = await Teacher.create({
      name : name.toLowerCase(),
      gender : gender.toLowerCase(),
      phone : Number(phone),
      email : email.toLowerCase(),
      dob : new Date(dob),
      assignedSubject : assignedSubject.toLowerCase(),
      photo: profile && profile?.url,
      salary : Number(salary),
    });

    const newTeacher = await Teacher.findById(createdTeacher._id);

    if (!newTeacher) {
      return res.status(400).json({ message: "Error creating teacher" });
    }


    return res
      .status(200)
      .json(new apiResponse(201, "Teacher Added Successfully", newTeacher));
  } catch (error) {
    console.error(error);
    req.file && fs.unlinkSync(req.file.path)
    return res.status(500).json({ message: error.message });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();

    if (!teachers.length) {
      return res.status(404).json({ message: "No teachers found" });
    }

    return res
     .status(200)
     .json(new apiResponse(200, "Teachers found", teachers));
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
    
  }
};

const getTeacherById = async (req, res) => {
  try {

    
    const teacher = await Teacher.findOne({email : req.params.id.toLowerCase()});


    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const gradesTeachertaking = await Class.find({"subjects.teacher" : teacher._id},{
      grade : 1,
      _id : 1
    })


    return res.status(200).json(new apiResponse(201,"data fetched successfully",{teacher,gradesTeachertaking}))
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
    
  }
};

const updateTeacher = async (req, res) => {
  try {
    const teacherEmail = req.params.id;

    const teacher = await Teacher.findOne({ email: teacherEmail.toLowerCase() });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // update teacher data

    const { name, gender, phone, email, dob, assignedSubject, salary } =
      req.body;

    if (
      !name ||
      !gender ||
      !phone ||
      !email ||
      !dob ||
      !assignedSubject ||
      !salary
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    //validate all data

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!ValidatePhone(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    if (!validateDOB(dob).valid) {
      return res.status(400).json({ message: validateDOB(dob).message });
    }


    // update the teacher

    const createdTeacher = await Teacher.findOneAndUpdate({email:teacherEmail},{
      $set:{
        name : name.toLowerCase(),
        gender : gender.toLowerCase(),
        phone : Number(phone),
        email : email.toLowerCase(),
        dob : new Date(dob),
        assignedSubject : assignedSubject.toLowerCase(),
        salary : Number(salary),
      },
      $new : true
    })

    const newTeacher = await Teacher.findById(createdTeacher._id);

    if (!newTeacher) {
      return res.status(400).json({ message: "Error creating teacher" });
    }

    return res
      .status(200)
      .json(new apiResponse(201, "Teacher Updated Successfully", newTeacher));
  } catch (error) {
    console.error(error);
   
    return res.status(500).json({ message: error.message });
  }
  
};

const updatepofile = async (req,res) =>{
  try {
    const teacherEmail = req.params.id;
    const teacher = await Teacher.findOne({ email: teacherEmail.toLowerCase() });
    
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    
    // update teacher data
    const localFilepath = req.file && req.file.path;
    
    if (!localFilepath) {
      console.log("No Photo Provided");
      return res.status(400).json({ message: "No photo provided" });
    }
    
    var profile = await savetoCloudinary(localFilepath);

    if (!profile?.url) {
      console.error("Error uploading photo");
      req.file && fs.unlinkSync(req.file.path)
      return res.status(400).json({ message: "Error uploading photo" });
    }
    
    const updatedTeacher = await Teacher.findOneAndUpdate({email:teacherEmail},{
      $set:{
        photo : profile?.url,
      },
      $new : true
    })
    
    const newTeacher = await Teacher.findById(updatedTeacher._id);
    
    if (!newTeacher) {
      return res.status(400).json({ message: "Error updating teacher" });
    }

    return res.status(200).json(new apiResponse(201,"profile photo updated successfully",newTeacher))

    
  } catch (error) {
    console.error(error);
    req.file && fs.unlinkSync(req.file.path)
    return res.status(500).json({ message: error.message });

    
  }
}

const deleteTeacher = async (req, res) => {
  try {

    const teacher = await Teacher.findOneAndDelete({ email : req.params.id.toLowerCase()});

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

   await Class.updateMany({"subjects.teacher" : teacher._id},{
     $pull : { subjects : { teacher : teacher._id } }
   },
   {safe: true, multi: true});

    return res.status(200).json(new apiResponse(201,"Teacher deleted successfully",teacher))


    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
    
  }
};

const getTeachersbySubject = async (req,res) =>{
  try {
    const teachers = await Teacher.find({assignedSubject : req.params.subject.toLowerCase()});
    
    if (!teachers.length) {
      return res.status(404).json({ message: "No teachers found for this subject" });
    }
    return res.status(200).json(new apiResponse(201,"Teachers found for this subject",teachers))
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
  
}

const getTeacherByName = async (req,res) =>{
  try {
    const teacher = await Teacher.findOne({name : req.params.name.toLowerCase()});
    
    if (!teacher) {
      return res.status(404).json({ message: "No teacher found with this name" });
    }
    return res.status(200).json(new apiResponse(201,"Teacher found",teacher))
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
    
  }
}




export {
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherById,
  getAllTeachers,
  getTeachersbySubject,
  updatepofile,
  getTeacherByName
};
