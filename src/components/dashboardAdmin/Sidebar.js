import React from "react";
import { logout } from "../../api/atlantis-api";
import { useAdminAuth } from "../../context/AdminAuthContextProvider";

function Sidebar() {
  const admin = useAdminAuth();
  const handleLogout = async () => {
    await logout(admin.state.token);

    admin.dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="h-screen bg-blue-500">
      <div>Sidebar</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
