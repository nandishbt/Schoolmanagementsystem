import { useState, useEffect } from "react";
import { getAllTeachers, getOneClass, updateClass } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateClassForm() {
    const navigate = useNavigate()
    const { grade } = useParams()
    const [teachers, setTeachers] = useState([])
    const [previousData,setPreviousData] = useState()
  const [formData, setFormData] = useState({
    grade: "",
    year: "",
    studentFees: "",
    subjectData: [{ subject: "", teacher: "" }],
  });

  useEffect(() => {
    if (previousData) {
      setFormData(previousData);
    }
  }, [previousData]);

  const handleChange = (e, index = null, field = null) => {
    if (index !== null && field) {
      const updatedSubjects = [...formData.subjectData];
      updatedSubjects[index][field] = e.target.value;
      setFormData({ ...formData, subjectData: updatedSubjects });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjectData: [...formData.subjectData, { subject: "", teacher: "" }],
    });
  };

  const removeSubject = (index) => {
    const updatedSubjects = formData.subjectData.filter((_, i) => i !== index);
    setFormData({ ...formData, subjectData: updatedSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await updateClass(grade,formData)

    if(res.status <=201){
        alert('Class updated successfully')
        
    }else{
        alert('Error updating class')
    }

    navigate(-1)
    


    


  };

  const fetchteachers = async () =>{
    try {
        const res = await getAllTeachers()
        const resData = await res.data
        resData.forEach((teacher) =>{
            setTeachers((prev)=>[...prev,{teacherID:teacher._id, teachername:teacher.name, subject:teacher.assignedSubject}, ])
        })
        
        
    } catch (error) {
        console.error(error)
        
    }
  }

  const fetchprevdata = async () =>{
    try {
        const res = await getOneClass(grade)
        const resData = res.data
        console.log(resData);
        

        setPreviousData(()=>({
            grade: resData?.grade,
            studentFees: resData?.studentFees,
            year: resData?.year,
            subjectData: resData?.teachers.map((data,index)=>(
                {subject:data.assignedSubject, teacher:data._id}
            ))

        }))
       
        
    } catch (error) {
        console.error(error)
        
    }
  }

  useEffect(()=>{
        fetchteachers()
        fetchprevdata()
  },[])

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
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
        <label className="block text-sm font-medium">Year:</label>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Student Fees:</label>
        <input
          type="number"
          name="studentFees"
          value={formData.studentFees}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Subjects:</label>
        {formData.subjectData.map((item, index) => (
          <div key={index} className="flex space-x-2 mt-2">
            <input
              type="text"
              placeholder="Subject"
              value={item.subject}
              onChange={(e) => handleChange(e, index, "subject")}
              className="p-2 border rounded w-1/2"
              required
            />
            <select
              value={item.teacher}
              onChange={(e) => handleChange(e, index, "teacher")}
              className="p-2 border rounded w-1/2"
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.teacherID} value={teacher.teacherID}>
                  {teacher.teachername} - {teacher.subject}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeSubject(index)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSubject}
          className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Subject
        </button>
      </div>
      
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded"
      >
        Update Class
      </button>
    </form>
  );
}
