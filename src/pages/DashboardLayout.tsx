import React from "react";
import { Outlet } from "react-router-dom";
import DashboardDownbar from "../components/DashboardDownbar";

const DashboardLayout:React.FC = () => {
  return (
    <div className="min-h-screen pt-12 pb-20">
      <Outlet />
      <DashboardDownbar />
    </div>
  );
};

export default DashboardLayout;
