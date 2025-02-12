import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneTeacher, updateTeacher } from "../../utils/api";

export default function UpdateTeacherForm() {
const navigate = useNavigate()

const {email} = useParams()

const[previousData,setpreviousData] = useState()
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    salary: "",
    phone: "",
    email: "",
    dob: "",
    assignedSubject: ""
  });

  const subjects = [
    "Hindi", "English", "Kannada", "Science", "Social", "Mathematics", "Political Science"
  ];

  useEffect(() => {
    if (previousData) {
      setFormData({
        ...previousData,
        dob: previousData.dob ? new Date(previousData.dob).toISOString().split("T")[0] : ""
      });
    }
  }, [previousData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateTeacher(email,formData)

    console.log(res);
    

    if(res.status<=201){
        alert("Teacher updated successfully")
    }else{
        alert("Error updating teacher")
    }

    navigate('/')


   
  };

  const fetchprevdata = async () =>{
    try {
        const res = await getOneTeacher(email)
        const resData = res.data

        console.log(resData);
        

        setpreviousData(()=>({
            name:resData.teacher.name,
            gender:resData.teacher.gender,
            salary:resData.teacher.salary,
            phone:resData.teacher.phone,
            email:resData.teacher.email,
            dob:resData.teacher.dob,
            assignedSubject:resData.teacher.assignedSubject,

        }))
      


        
        
    } catch (error) {
        console.error("Error fetching previous data:", error);
        
    }
  }

  useEffect(()=>{
    fetchprevdata()

  },[])
  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
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
        <label className="block text-sm font-medium">Salary:</label>
        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
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
        <label className="block text-sm font-medium">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
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
        <label className="block text-sm font-medium">Assigned Subject:</label>
        <select
          name="assignedSubject"
          value={formData.assignedSubject}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Subject</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
      </div>
      
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        Update Teacher
      </button>
    </form>
  );
}