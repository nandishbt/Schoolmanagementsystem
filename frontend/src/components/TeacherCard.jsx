import React from 'react'

const TeacherCard = ({name,gender,subject,email,phone,salary}) => {
  return (
    <tr>
    <td className="px-4 py-2 font-semibold whitespace-nowrap text-gray-900 capitalize">{name}</td>
    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{gender}</td>

    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{subject}</td>
    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{email}</td>
    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{phone}</td>
    <td className="px-4 py-2 whitespace-nowrap text-gray-700">{salary}</td>

    <td className="px-4 py-2 whitespace-nowrap">
      <a
        href={`/teachers/teacher/${email}`}
        className="inline-block rounded-sm bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
      >
        View
      </a>
    </td>
  </tr>
  )
}

export default TeacherCard