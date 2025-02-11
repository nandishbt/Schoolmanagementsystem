import React from "react";

const ClassBtn = ({ grade}) => {
  return (
    <div className="w-1/2 m-2">
      <a
        className="group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-indigo-600 transition-colors hover:bg-indigo-600 focus:ring-3 focus:outline-hidden"
        href={`class/grade/${grade}`}
      >
        <span className="font-medium transition-colors group-hover:text-white">
          {" "}
          {grade}th{" "} Grade
        </span>

        <span className="shrink-0 rounded-full border border-indigo-600 bg-white p-2">
          <svg
            className="size-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </a>
    </div>
  );
};

export default ClassBtn;
