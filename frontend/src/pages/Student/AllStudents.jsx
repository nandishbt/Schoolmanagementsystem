import React, { useEffect, useState } from 'react'
import { getAllStudents } from '../../utils/api'
import StudentCard from '../../components/StudentCard'

const AllStudents = () => {
  const [data, setData] = useState([{}])

  // Fetch data from API

  const fetch = async () => {
    try {
      const res = await getAllStudents();
      const resData = await res.data;
      console.log(resData);

      setData(resData);

      
      
      
    } catch (error) {
      console.error(error)
      
    }

  }

  useEffect(()=>{
    fetch()
  },[])
  return (
    <div className="w-[95vw] h-[90vh] overflow-y-scroll">
       <h1 className="text-center text-4xl my-5 font-bold ">
        Students of this school
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
                DOB
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                Grade
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                Roll No
              </th>
              <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">
                Fees Paid
              </th>

              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data?.map((elem) => (
              <StudentCard key={elem.rollNo} name={elem.name} gender = {elem.gender} dob = {new Date(elem.dob).toLocaleDateString('en-IN')} grade={elem.grade} rollNo={elem.rollNo} feesPaid={elem.feesPaid}/>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AllStudents