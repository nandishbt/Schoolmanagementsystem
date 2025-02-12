import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { deleteStudent, getOneStudent, updateStudent, updateStudentProfile } from '../../utils/api'
import DeleteBtn from '../../components/DeleteBtn'

const EachStudent = () => {
  const navigate = useNavigate()

  const {rollno} = useParams()

  const [data, setData] = useState({
    name: '',
    age: 0,
    gender:'',
    photo:'',
    phone:'',
    rollNo:0,
    dob:'',
    feesPaid:0,
    teacherDetails:[],
    classDetails :[]
  })

  const [imageFile, setImageFile ] = useState(null)



  const fetch = async () =>{
    try {
      const res = await getOneStudent(rollno)
      
      const resData = await res.data

      console.log(resData);

      setData(()=>resData)
      
      
    } catch (error) {
      console.error(error)
      
    }
  }

  const updateThisStudent = async (e) =>{
    e.preventDefault()
    const formData = {
      name: data.name,
      gender:data.gender,
      phone:data.phone,
      roll:data.rollNo,
      dob:dob,
      grade:data.classDetails.grade,
      feesPaid: data.feesPaid
    }
    
    try {
      const res = await updateStudent(rollno, formData)
    } catch (error) {
      console.error(error)
      
    }

  }

  const deleteThisStudent = async () =>{
    try {
      const res = await deleteStudent(rollno)

      navigate(-1)
      
    } catch (error) {
      console.error(error)
      
    }
  }

  const updateThisprofile = async()=>{
    try {
      const res = await updateStudentProfile(imageFile)
      
    } catch (error) {
      console.error(error)
      
    }

  }

  useEffect(()=>{
    fetch()
    
  },[])
  return (
    <div className="w-[95vw] h-[90vh] overflow-y-scroll">
      <h1 className="text-center text-4xl my-5 ">
        Details of {data.name.toUpperCase()}
      </h1>
    <div className="flow-root p-5">
    <dl className="-my-3 divide-y divide-gray-100 text-sm">
      <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900 ">Name</dt>
        <dd className="text-gray-700 sm:col-span-2">{data.name}</dd>
      </div>
  
      <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">Roll No</dt>
        <dd className="text-gray-700 sm:col-span-2">{data.rollNo}</dd>
      </div>
  
      <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">Gender</dt>
        <dd className="text-gray-700 sm:col-span-2">{data.gender}</dd>
      </div>
  
      <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">Date Of Birth</dt>
        <dd className="text-gray-700 sm:col-span-2">{new Date(data.dob).toLocaleDateString('en-IN')}</dd>
      </div>

      <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">Phone</dt>
        <dd className="text-gray-700 sm:col-span-2">{data.phone}</dd>
      </div>

      <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">Fees Paid</dt>
        <dd className="text-gray-700 sm:col-span-2">{data.feesPaid}</dd>
      </div>

      <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">Class</dt>
        <dd className="text-gray-700 sm:col-span-2">{data.grade}</dd>
      </div>

      <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">Teachers</dt>
        
          
            <dd className="text-gray-700 sm:col-span-2">{data.teacherDetails.map((teacher,index)=>(
             <span>{teacher.name}{'('+ teacher.assignedSubject.toUpperCase() + ')' + ", " }</span>))} 
            </dd>
     
        
     
      </div>
  
      <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
        <dt className="font-medium text-gray-900">Bio</dt>
        <dd className="text-gray-700 sm:col-span-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facilis debitis explicabo
          doloremque impedit nesciunt dolorem facere, dolor quasi veritatis quia fugit aperiam
          aspernatur neque molestiae labore aliquam soluta architecto?
        </dd>
      </div>
    </dl>
  </div>
  
  <div onClick={deleteThisStudent}  className="flex justify-center items-center bottom-5 fixed">
        <DeleteBtn />
      </div>
  
  </div>
  )
}

export default EachStudent