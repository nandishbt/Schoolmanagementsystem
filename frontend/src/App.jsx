import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Admin from "./pages/Admin/Admin";
import AllClass from "./pages/Class/AllClass";
import EachClass from "./pages/Class/EachClass";
import AddClass from "./pages/Class/AddClass";
import AllTeachers from "./pages/Teacher/AllTeachers";
import AddTeacher from "./pages/Teacher/AddTeacher";
import EachTeacher from "./pages/Teacher/EachTeacher";
import AllStudents from "./pages/Student/AllStudents";
import AddStudent from "./pages/Student/AddStudent";
import EachStudent from "./pages/Student/EachStudent";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import UpdateClassForm from "./pages/Class/UpdateClassRoom";
import UpdateStudentForm from "./pages/Student/UpdateStudentForm";
import UpdateTeacherForm from "./pages/Teacher/UpdateTeacherForm";
const App = () => {
  return (
    <div className="min-h-screen">
      
        <Routes>
          <Route path="/" element = {<Layout />}>
           
          <Route path="" element={<Admin />} />
          <Route path="class" element={<AllClass />} />
          <Route path="class/create" element={<AddClass />} />
          <Route path="class/grade/:grade" element={<EachClass />} />
          <Route path="class/grade/edit/:grade" element={<UpdateClassForm />} />

          <Route path="teachers" element={<AllTeachers />} />
          <Route path="teachers/create" element={<AddTeacher />} />
          <Route path="teachers/teacher/:email" element={<EachTeacher />} />
          <Route path="teachers/teacher/edit/:email" element={<UpdateTeacherForm />} />

          <Route path="students" element={<AllStudents />}/>
          <Route path="students/create" element={<AddStudent />} />
          <Route path="students/student/:rollno" element={<EachStudent />} />
          <Route path="students/student/edit/:rollno" element={<UpdateStudentForm />} />

          </Route>
      
        </Routes>
   
    </div>
  );
};

export default App;
