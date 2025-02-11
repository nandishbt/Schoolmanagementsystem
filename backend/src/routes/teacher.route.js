import express from "express";
import { addTeacher, deleteTeacher, getAllTeachers, getTeacherById, getTeacherByName, getTeachersbySubject, updatepofile, updateTeacher } from "../controllers/teacher.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router()




router.route('/create').post(upload.single('photo'),addTeacher)

router.route('/get/:id').get(getTeacherById)

router.route('/get/teacher/:name').get(getTeacherByName)

router.route('/getall').get(getAllTeachers)

router.route('/edit/:id').put(updateTeacher)

router.route('/edit/profile/:id').put(upload.single('photo'),updatepofile)

router.route('/delete/:id').delete(deleteTeacher)

router.route('/getall/subject/:subject').get(getTeachersbySubject)

export default router

