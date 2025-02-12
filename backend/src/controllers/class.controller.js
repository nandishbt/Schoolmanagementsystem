import { Class } from "../models/class.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { validateSchoolYear } from "../utils/validators.js";
import {Student} from '../models/student.model.js'

const createClass = async (req, res) => {
  try {
    const { grade, year, studentFees, subjectData } = req.body;
    //validation
    if (!grade || !year || !studentFees) {
      return res.status(400).json({ message: "All fields are required" });
    }
    

    //check if class already exists
    const existingClass = await Class.findOne({ grade, year });

    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }


    //validate subjects
    const validSubjects = subjectData.map((data) => {
      if (!data.subject || !data.teacher) {
        return res.status(400).json({ message: "Invalid subjects data" });
      }
      
      return {
        subject: data.subject.toLowerCase(),
        teacher: data.teacher.toLowerCase(),
      };
    });

    if (validSubjects.length !== subjectData.length) {
      return res.status(400).json({ message: "Invalid subjects data" });
    }

    // if(!validateSchoolYear(year).valid){
    //   return res.status(400).json({ message: validateSchoolYear(year).message});
    // }
    

    //create a class
    const newClass = await Class.create({
      grade : Number(grade),
      year,
      studentFees : Number(studentFees),
      subjects: validSubjects || [],
    });

    const createdClass = await Class.findById(newClass._id);

    if (!createdClass) {
      return res.status(404).json({ message: "Error creating class" });
    }

    return res
      .status(200)
      .json(new apiResponse(201, "class created successfully", createdClass));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getClassbyId = async (req, res) => {
  try {
    const { grade } = req.params;

    if(!grade){
      return res.status(400).json({ message: "Grade is required" });
    }

    if(grade>12 || grade<0){
      return res.status(400).json({ message: "Invalid grade entered. Grade should be between 1 and 12" });
    }

    const classData = await Class.aggregate([
      { $match: { grade: Number(grade) } },
      {
        $lookup: {
          from: "teachers",
          localField: "subjects.teacher",
          foreignField: "_id",
          as: "teachers",
        },
        
      },

      {
        $lookup:{
          from: "students",
          localField: "studentList",
          foreignField: "_id",
          as: "studentList",
        }

      },
      {
        $project : {
          _id: 1,
          grade: 1,
          year: 1,
          studentFees: 1,
          studentList : {
            _id: 1,
            name: 1,
            gender : 1,
            photo: 1,
            rollNo:1,
            feesPaid:1,
            grade:1,
            dob:1
            
          },
          
          teachers: {
            _id: 1,
            name: 1,
            dob:1,
            gender:1,
            phone:1,
            email:1,
            photo: 1,
            assignedSubject:1,
            salary:1
           
        
          }
        }
      }
      
    ])

    if (!classData.length) {
      return res.status(404).json({ message: "Class not found" });
    }

    return res.status(200).json(new apiResponse(200, "Class found", classData[0]));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getClasses = async (req, res) => {
  try {
    const classesData = await Class.find();

    if (!classesData) {
      return res.status(404).json({ message: "No classes found" });
    }

    //sort classes by grade
    classesData.sort((a, b) => a.grade - b.grade);
    
    return res
      .status(200)
      .json(new apiResponse(200, "Classes found", classesData));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateClass = async (req, res) => {
  try {
    const { grade } = req.params;

    if (!grade) {
      return res.status(400).json({ message: "Class grade is required" });
    }

    const existingClass = await Class.findOne({ grade });

    if (!existingClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const { year, studentFees, subjectData } = req.body;

    //validation
    if (!year || !studentFees || !subjectData) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //validate subjects
    const validSubjects = subjectData.map((data) => {
      if (!data.subject || !data.teacher) {
        return res.status(400).json({ message: "Invalid subjects data" });
      }
      return {
        subject: data.subject.toLowerCase(),
        teacher: data.teacher,
      };
    });

    if (validSubjects.length !== subjectData.length) {
      return res.status(400).json({ message: "Invalid subjects data" });
    }

    //update a class
    const newClass = await Class.findOneAndUpdate(
      { grade },
      {
        $set: {
          year,
          studentFees:Number(studentFees),
          subjects: validSubjects || [],
        },
        new: true,
      }
    );

    const createdClass = await Class.findById(newClass._id);

    if (!createdClass) {
      return res.status(404).json({ message: "Error creating class" });
    }

    return res
      .status(200)
      .json(new apiResponse(201, "class updated successfully", createdClass));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteClass = async (req, res) => {
  try {
    const { grade } = req.params;

    if (!grade) {
      return res.status(400).json({ message: "Grade is required" });
    }

    const deletedClass = await Class.findOneAndDelete({ grade });

    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    //delete associated students
    await Student.deleteMany({class : deletedClass._id})

    return res
      .status(200)
      .json(new apiResponse(200, "Class deleted successfully", deletedClass));
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export { createClass, updateClass, deleteClass, getClasses, getClassbyId };
