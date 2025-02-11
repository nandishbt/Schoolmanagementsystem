import express from "express";
import { addStudent, deleteStudent, getAllStudents, getStudentById, updateStudent, updateStudentProfile } from "../controllers/student.controller.js";
import {upload} from '../middlewares/multer.middleware.js'
const router = express.Router()



router.route('/create').post(upload.single('photo') ,addStudent)

router.route('/get/:rollno').get(getStudentById) 

router.route('/getall').get(getAllStudents)

router.route('/edit/:rollno').put(updateStudent)

router.route('/edit/profile/:rollno').put(upload.single('photo'),updateStudentProfile)

router.route('/delete/:rollno').delete(deleteStudent)




export default router
