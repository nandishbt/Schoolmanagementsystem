import React from 'react'

const StudentCard = ({name,gender,dob,grade,rollNo,feesPaid}) => {
  return (
    <tr>
        <td className="px-4 py-2 font-semibold whitespace-nowrap text-gray-900 capitalize">{name}</td>
        <td className="px-4 py-2 whitespace-nowrap text-gray-700">{gender}</td>

        <td className="px-4 py-2 whitespace-nowrap text-gray-700">{dob}</td>
        <td className="px-4 py-2 whitespace-nowrap text-gray-700">{grade}</td>
        <td className="px-4 py-2 whitespace-nowrap text-gray-700">{rollNo}</td>
        <td className="px-4 py-2 whitespace-nowrap text-gray-700">{feesPaid}</td>

        <td className="px-4 py-2 whitespace-nowrap">
          <a
            href={`/students/student/${rollNo}`}
            className="inline-block rounded-sm bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            View
          </a>
        </td>
      </tr>
   
  )
}

export default StudentCard