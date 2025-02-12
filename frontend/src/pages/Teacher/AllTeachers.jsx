import React, { useEffect, useState } from 'react'
import { getAllTeachers } from '../../utils/api';
import TeacherCard from '../../components/TeacherCard';

const AllTeachers = () => {
  const [data, setData] = useState();

  const fetch = async () =>{
    try {
      const res = await getAllTeachers();

      const resData = await res.data

      setData(()=>resData)
      
      
    } catch (error) {
      console.error(error);
      
    }
  }

  useEffect(()=>{
    fetch()
  },[])
  return (
    <div className="w-[95vw] h-[90vh] overflow-y-scroll">

<h1 className="text-center text-4xl my-5 font-bold">
        Teachers of this school
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                Name
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                Gender
              </th>

              <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                Subject
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                Email
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                Phone No
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                Salary
              </th>

              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.map((elem) => (
              <TeacherCard key={elem.email} name={elem.name} gender = {elem.gender} subject = {elem.assignedSubject} email={elem.email} phone={elem.phone} salary={elem.salary}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllTeachers