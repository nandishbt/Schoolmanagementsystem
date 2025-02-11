import React from 'react'

const DeleteBtn = () => {
  return (
    <div>
        {/* Base */}

<a
  className="group relative inline-block text-sm font-medium text-white focus:ring-3 focus:outline-hidden"
  href="/"
>
  <span className="absolute inset-0 border border-red-600"></span>
  <span
    className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1"
  >
    Delete
  </span>
</a>




    </div>
  )
}

export default DeleteBtn