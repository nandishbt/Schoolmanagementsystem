import React, { useState } from 'react'
import { addTeacher } from '../../utils/api'

const AddTeacher = ({onUpdate}) => {
  const [data, setData] = useState()

  const addThisTeacher = async () =>{
    try {
      const res = await addTeacher(formData)

      if(res.status>=200){
        alert("Teacher added successfully")
      }else{
        alert("Error adding teacher")
      }

    } catch (error){
      console.error(error)

    }
  }

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    photo: null,
    dob: "",
    salary: "",
    assignedSubject: "",
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

    await addThisTeacher()


    setFormData({
      name: "",
      gender: "",
      phone: "",
      email: "",
      photo: null,
      dob: "",
      salary: "",
      assignedSubject: "",
    })
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Teacher</h2>
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
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
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
        />
        
        <input 
          type="number" 
          name="salary" 
          placeholder="Salary" 
          value={formData.salary} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required 
        />
        
        <input 
          type="text" 
          name="assignedSubject" 
          placeholder="Assigned Subject" 
          value={formData.assignedSubject} 
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

export default AddTeacher