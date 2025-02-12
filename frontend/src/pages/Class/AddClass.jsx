import { useEffect, useState } from "react";
import { addClass, addTeacher, getAllTeachers } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AddClass = () => {
 const navigate = useNavigate()
  const [teachers, setteachers] = useState([])
  const [formData, setFormData] = useState({
    grade: "",
    year: "",
    studentFees: "",
    subjectData: [{ subject: "", teacher: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...formData.subjectData];
    updatedSubjects[index][field] = value;
    setFormData({ ...formData, subjectData: updatedSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjectData: [...formData.subjectData, { subject: "", teacher: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  
   const res =  await addClass(formData)

   if(res.status<=201){
    alert("class added successfully ")
   }else{
    alert("Error adding class")


   }

    setFormData({
      grade: "",
      year: "",
      studentFees: "",
      subjectData: [{ subject: "", teacher: "" }],
    });

    navigate('/')


  };

  const getallTeachers = async () =>{
    try {
      const res = await getAllTeachers()
      const resData = await res.data

      resData.forEach(teacher =>{
        setteachers((prev)=>[...prev,{id:teacher._id, teacherName:teacher.name, subject:teacher.assignedSubject}])

      }

      )


      console.log(teachers);
      
    
      
    } catch (error) {
      console.error(error)
      return error
      
    }
  }

  useEffect(()=>{
    getallTeachers()
  },[])

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Class</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="studentFees"
          placeholder="Student Fees"
          value={formData.studentFees}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <div>
          <h3 className="text-lg font-semibold">Subjects</h3>
          {formData.subjectData.map((subjectEntry, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Subject"
                value={subjectEntry.subject}
                onChange={(e) =>
                  handleSubjectChange(index, "subject", e.target.value)
                }
                className="w-1/2 p-2 border rounded"
                required
              />

              <select
                value={subjectEntry.teacher}
                onChange={(e) =>
                  handleSubjectChange(index, "teacher", e.target.value)
                }
                className="w-1/2 p-2 border rounded"
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.teacherName} ({teacher.subject})
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubject}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Subject
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddClass;
