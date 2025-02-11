import express from 'express';
import { createClass, deleteClass, getClassbyId, getClasses, updateClass } from '../controllers/class.controller.js';

const router = express.Router()

router.route('/create').post(createClass)
router.route('/get/:grade').get(getClassbyId)
router.route('/getall').get(getClasses)
router.route('/edit/:grade').put(updateClass)
router.route('/delete/:grade').delete(deleteClass)


export default router