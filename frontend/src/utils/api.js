import axios from 'axios'
import { url } from './url'



//apis for admin

export const getTotalStudents = async () => {
    try {
        const totalStudents = await axios.get(url+'admin/total/students')
        return totalStudents.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }

}

export const getTotalTeachers = async () => {
    try {
        const totalTeachers = await axios.get(url+'admin/total/teachers')
        return totalTeachers.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const getTotalFees = async () => {
    try {
        const totalFees = await axios.get(url+'admin/total/fees')
        return totalFees.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const getTotalSalary = async () => {
    try {
        const totalSalary = await axios.get(url+'admin/total/salary')
        return totalSalary.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}


//apis for class

export const addClass = async (data) => {
    try {
        const response = await axios.post(url+'class/create', data)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }

}

export const getAllClasses = async () =>{
    try {
        const classes = await axios.get(url+'class/getall')
        return classes.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }

}

export const getOneClass = async (grade) => {
    try {

        const classData = await axios.get(url+'class/get/'+grade)
        return classData.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }

}

export const updateClass = async (grade, data) => {
    try {
        const response = await axios.put(url+'class/edit/'+grade, data)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const deleteClass = async (grade) => {
    try {
        const response = await axios.delete(url+'class/delete/'+grade)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}


//apis for student

export const addStudent = async (data) => {
    try {
        const response = await axios.post(url+'student/create', data)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }

}

export const getAllStudents = async () => {
    try {
        const students = await axios.get(url+'student/getall')
        return students.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const getOneStudent = async (rollno) => {
    try {
        const studentData = await axios.get(url+'student/get/'+rollno)
        return studentData.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const updateStudent = async (rollno, data) => {
    try {
        const response = await axios.put(url+'student/edit/'+rollno, data)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const updateStudentProfile = async (rollno, data) => {
    try {
        const response = await axios.put(url+'student/edit/profile'+rollno, data)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const deleteStudent = async (rollno) => {
    try {
        const response = await axios.delete(url+'student/delete/'+rollno)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}


//apis for teachers

export const addTeacher = async (data) => {
    try {
        const response = await axios.post(url+'teacher/create', data)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }

}

export const getAllTeachers = async () => {
    try {
        const teachers = await axios.get(url+'teacher/getall')
        return teachers.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const getOneTeacher = async (email) => {
    try {
        const teacherData = await axios.get(url+'teacher/get/'+email)
        return teacherData.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const updateTeacher = async (email, data) => {
    try {
        const response = await axios.put(url+'teacher/edit/'+email, data)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const updateTeacherProfile = async (email, data) => {
    try {
        const response = await axios.put(url+'teacher/edit/profile'+email, data)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const deleteTeacher = async (email) => {
    try {
        const response = await axios.delete(url+'teacher/delete/'+email)
        return response.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const getAllTeachersForSubject = async (subject) =>{
    try {
        const teachers = await axios.get(url+'teacher/getall/subject/'+subject)
        return teachers.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}

export const getTeacherByName = async (name) =>{
    try {
        const teachers = await axios.get(url+'teacher/get/teacher/'+name)
        return teachers.data
        
    } catch (error) {
        console.error(error)
        return error
        
    }
}





