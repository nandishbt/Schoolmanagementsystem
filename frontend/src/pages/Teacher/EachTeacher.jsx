import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTeacher,
  getOneTeacher,
  updateTeacher,
  updateTeacherProfile,
} from "../../utils/api";
import DeleteBtn from "../../components/DeleteBtn";

const EachTeacher = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  const [imageFile, setimageFile] = useState();

  const fetch = async () => {
    try {
      const res = await getOneTeacher(email);
      const resData = await res.data;
      console.log(resData);

      setData(resData);

      // console.log(resData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTeacherData = async (e) => {
    e.preventDefault();
    const formData = {
      name: data?.teacher.name,
      phone: data?.teacher.phone,
      email: data?.teacher.email,
      gender: data?.teacher.gender,
      dob: data?.teacher.dob,
      salary: data?.teacher.salary,
      assignedSubject: data?.teacher.assignedSubject,
    };
    try {
      const res = await updateTeacher(email, formData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTeacherProfilePhoto = async () => {
    try {
      const res = await updateTeacherProfile(email, imageFile);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteThisTeacher = async () => {
    try {
      const res = await deleteTeacher(email);
      navigate(-1);
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
        Details of {data?.teacher.name?.toUpperCase()}
      </h1>
      <div className="flow-root p-5">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 ">Name</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {data?.teacher.name}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Subject</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {data?.teacher.assignedSubject}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Gender</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {data?.teacher.gender}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Date Of Birth</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {new Date(data?.teacher.dob).toLocaleDateString("en-IN")}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Phone</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {data?.teacher.phone}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Email</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {data?.teacher.email}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Salary</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {data?.teacher.salary}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Assigned Classes</dt>

            <dd className="text-gray-700 sm:col-span-2">{
              data?.gradesTeachertaking.map((teacher, index)=>(
                <span>{teacher.grade + ", "}</span>
              ))
                }

            </dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Bio</dt>
            <dd className="text-gray-700 sm:col-span-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
              facilis debitis explicabo doloremque impedit nesciunt dolorem
              facere, dolor quasi veritatis quia fugit aperiam aspernatur neque
              molestiae labore aliquam soluta architecto?
            </dd>
          </div>
        </dl>
      </div>
      <div
        onClick={deleteThisTeacher}
        className="flex justify-center items-center bottom-5 fixed"
      >
        <DeleteBtn name={'DELETE'} color="red"/>
      </div>
    </div>
  );
};

export default EachTeacher;
