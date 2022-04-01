import React from "react";
import { logoutUser } from "../../api/atlantis-api";
import { useUserAuth } from "../../context/UserAuthContextProvider";

function DashboardUser() {
  const user = useUserAuth();
  const handleLogout = async () => {
    await logoutUser(user.state.token);

    user.dispatch({ type: "LOGOUT" });
  };
  return (
    <div>
      <div>Dashboard User</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default DashboardUser;
