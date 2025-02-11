import React, { useState } from 'react'
import { addStudent } from '../../utils/api'

const AddStudent = () => {


  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    dob: "",
    photo: null,
    grade: "",
    feesPaid: "",
    rollNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Handle form submission logic

   const res =  await addThisStudent()


   

   

   setFormData({
    name: "",
    gender: "",
    phone: "",
    dob: "",
    photo: null,
    grade: "",
    feesPaid: "",
    rollNo: "",
  });


  };


  const addThisStudent = async() =>{
  
    try {
      const res = await addStudent(formData)

      if(res.status <400){
        alert(res.message)
        
      }
      else{
        alert(res.message)
     
      }

      
    } catch (error) {
      console.error(error)
      
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required 
        />
        
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        
        <input 
          type="tel" 
          name="phone" 
          placeholder="Phone" 
          value={formData.phone} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required 
        />

        <input 
          type="date" 
          name="dob" 
          value={formData.dob} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required 
        />
        
        <input 
          type="file" 
          name="photo" 
          onChange={handleFileChange} 
          className="w-full p-2 border rounded" 
          required 
        />
        
        <input 
          type="text" 
          name="grade" 
          placeholder="Grade" 
          value={formData.grade} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required 
        />
        
        <input 
          type="number" 
          name="feesPaid" 
          placeholder="Fees Paid" 
          value={formData.feesPaid} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required 
        />
        
        <input 
          type="text" 
          name="rollNo" 
          placeholder="Roll Number" 
          value={formData.rollNo} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required 
        />
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddStudent