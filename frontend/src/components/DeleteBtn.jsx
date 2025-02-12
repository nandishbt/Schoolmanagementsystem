import React from 'react'

const DeleteBtn = ({name, color = 'blue'}) => {
  return (
    <div>
        {/* Base */}

<span
  className="group relative inline-block text-sm font-medium text-white focus:ring-3 focus:outline-hidden"

>
  <span className="absolute inset-0 border border-red-600"  style={{
    borderColor: color,
  }}></span>
  <span
    className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
    style={{
      borderColor: color,
      backgroundColor: color,
    }}
  >
    {name}
  </span>
</span>




    </div>
  )
}

export default DeleteBtn