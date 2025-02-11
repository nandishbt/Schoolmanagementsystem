import express from 'express';
import { getTotalFees, getTotalSalary, getTotalStudents, getTotalTeachers } from '../controllers/admin.controller.js';

const router = express.Router();
 

router.route('/total/students').get(getTotalStudents)
router.route('/total/teachers').get(getTotalTeachers)
router.route('/total/fees').get(getTotalFees)
router.route('/total/salary').get(getTotalSalary)




export default router