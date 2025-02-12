import React, { useEffect, useState } from "react";
import {
  getTotalFees,
  getTotalSalary,
  getTotalStudents,
  getTotalTeachers,
} from "../../utils/api";

import AdminCard from "../../components/adminCard";
import FinancialChart from "../../components/FinancialChart ";
import AnalyticsPage from "../../components/AnalyticsPage";

const Admin = () => {
  const [data, setData] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalFees: 0,
    totalSalary: 0,
  });

  const fetchData = async () => {
    try {
      const totalTeachers = await getTotalTeachers();
      const totalStudents = await getTotalStudents();
      const totalFees = await getTotalFees();
      const totalsalary = await getTotalSalary();

      setData({
        totalTeachers: totalTeachers.data,
        totalStudents: totalStudents.data,
        totalFees: totalFees.data,
        totalSalary: totalsalary.data,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-[95vw] h-[90vh] overflow-y-scroll">
      <h1 className="text-center text-4xl text-slate-900 my-5 font-bold ">Admin Dashboard</h1>
      <div className="flex flex-wrap justify-around">
      <AdminCard name='Total No Of Students' amount ={ data.totalStudents } />
      <AdminCard name='Total No Of Teachers' amount ={ data.totalTeachers } />
      <AdminCard name='Total Fees Collected' amount ={ data.totalFees } />
      <AdminCard name='Total Amount Spent On Salary' amount ={ data.totalSalary } />


      </div>
      <FinancialChart salaries={data.totalSalary} studentFees={data.totalFees} />
      <AnalyticsPage />

      
      
     
    </div>
  );
};

export default Admin;
