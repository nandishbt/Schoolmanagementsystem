import { useState, useEffect } from "react";
import { getOneStudent, updateStudent } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateStudentForm() {
    const navigate = useNavigate()
    const {rollno} = useParams()

    const[previousData,setpreviousData] = useState()
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    phone: "",
    dob: "",
    roll: "",
    grade: "",
    feesPaid: ""
    
  });

  useEffect(() => {
    if (previousData) {
      setFormData(previousData);
    }
  }, [previousData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       const res =  await updateStudent(rollno, formData)

       if(res.status<=201){
        alert("Student updated successfully!")
        
       }else{
        alert("Error updating student!")
       }

       navigate('/')

     


        
    } catch (error) {
        console.error("Error updating student:", error);
        
    }
    
  };

  const fetchpredata = async () =>{
    try {
       const res =  await getOneStudent(rollno)

       const resData = await res.data

       setpreviousData(()=>({
        name: resData.name,
        gender: resData.gender,
        phone: resData.phone,
        dob: new Date(resData.dob).toISOString().split("T")[0],
        roll: resData.rollNo,
        grade: resData.grade,
        feesPaid: resData.feesPaid,
       
       }))
       
        
    } catch (error) {
        console.error("Error fetching previous data:", error);
        
    }
  }

  useEffect(() => {
    fetchpredata()
  }, []);

  return (
    <div className="w-[95vw] h-[90vh] overflow-y-scroll">
    <form onSubmit={handleSubmit} className=" w-1/2 h-full mx-auto p-6 bg-white rounded-lg shadow-md space-y-4 mt-10">
      <div>
        <label className="block text-sm font-medium">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Gender:</label>
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
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium">Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Roll No:</label>
        <input
          type="text"
          name="roll"
          value={formData.roll}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Grade:</label>
        <input
          type="text"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Fees Paid:</label>
        <input
          type="number"
          name="feesPaid"
          value={formData.feesPaid}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        Update Student
      </button>
    </form>
    </div>
  );
}
