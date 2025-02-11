import React from 'react'

const AdminCard = ({name,amount}) => {
  return (
    <div className=" min-w-[30%] m-3 p-1 shadow-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl">
    <div className="bg- sm:p-10 p-6 rounded-xl">
      <div>
        <h5 className="text-3xl font-bold text-slate-50 text-center ">{amount}</h5>

        <p className="mt-2 text-xl  text-slate-800 shadow text-center">
         {name}
        </p>
      </div>
    </div>
  </div>
  )
}

export default AdminCard