import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-12">
        <div className="hidden md:flex lg:flex md:col-span-3 lg:col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          {/* <h1 className="text-3xl font-bold underline">DASHBOARD</h1> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
