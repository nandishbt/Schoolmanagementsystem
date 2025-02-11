import React, { useEffect, useState } from "react";
import { getAllClasses } from "../../utils/api";
import ClassBtn from "../../components/ClassBtn";

const AllClass = () => {
  const [data, setData] = useState([]);

  const fetch = async () => {
    try {
      const classes = await getAllClasses();

      const classesArray = await classes.data;

      setData(()=>classesArray)

      console.log(classesArray);
      

     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="w-[95vw] h-[90vh] overflow-y-scroll">
      <h1 className="text-center text-4xl my-5 text-slate-900">All Classes</h1>
     
    <div className="w-full ">
    {
        data.length && data.map((item, index) => (
          <div key={index}>
          <ClassBtn grade={item.grade}/>
          </div>
        ))
      }
    </div>
      
     
     
      
  
      
     
    </div>
  );
};

export default AllClass;
