import React, { useEffect, useState } from "react";
import { deleteClass, getOneClass, updateClass } from "../../utils/api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import StudentCard from "../../components/StudentCard";
import TeacherCard from "../../components/TeacherCard";
import DeleteBtn from "../../components/DeleteBtn";

const EachClass = () => {
  const { grade } = useParams();

  const navigate = useNavigate()

  const [data, setData] = useState({
    grade: 0,
    fees: 0,
    year: "2025-2026",
    students: [],
    teachers: [],
  });

  const fetch = async () => {
    try {
      const res = await getOneClass(grade);

      const resData = await res.data;

      setData(() => ({
        grade: resData?.grade,
        fees: resData?.studentFees,
        year: resData?.year,
        students: resData?.studentList,
        teachers: resData?.teachers,
      }));

     
    } catch (error) {
      console.error(error);
    }
  };

  const updateThisClass = async (e) => {
    e.preventDefault();

    const subjects = data?.teachers.map((elem) => ({
      teacher: elem._id,
      subject: elem.assignedSubject,
    }));
    const formData = {
      year: data?.year,
      grade: data?.grade,
      studentFees: data?.fees,
      subjectData: subjects,
    };
    try {
      const res = await updateClass(grade, formData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteThisClass = async () => {
    try {
      const res = await deleteClass(grade);

      navigate('/')
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="w-[95vw] h-[90vh] overflow-y-scroll">
      <h1 className="text-center text-4xl my-5 ">
        Students of {data?.grade}th Grade
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
            {data?.students.map((elem) => (
              <StudentCard key={elem.rollNo} name={elem.name} gender = {elem.gender} dob = {new Date(elem.dob).toLocaleDateString('en-IN')} grade={elem.grade} rollNo={elem.rollNo} feesPaid={elem.feesPaid}/>
            ))}
          </tbody>
        </table>
      </div>


      <h1 className="text-center text-4xl my-5 mt-20">
        Teachers of {data?.grade}th Grade
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
            {data?.teachers.map((elem) => (
              <TeacherCard key={elem.email} name={elem.name} gender = {elem.gender} subject = {elem.assignedSubject} email={elem.email} phone={elem.phone} salary={elem.salary}/>
            ))}
          </tbody>
        </table>
      </div>
      <div onClick={deleteThisClass}  className="flex justify-center items-center bottom-5 fixed">
        <DeleteBtn />
      </div>
    </div>
  );
};

export default EachClass;
