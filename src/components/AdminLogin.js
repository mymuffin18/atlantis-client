import React, { useState } from "react";
import { admin_login } from "../api/atlantis-api";

function AdminLogin() {
  const [adminLoginEmail, setAdminLoginEmail] = useState("");
  const [adminLoginPassword, setAdminLoginPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const { data, error } = await admin_login(
      adminLoginEmail,
      adminLoginPassword
    );
    if (error !== "") {
      console.log("this is error", error);
      setError(error);
    } else {
      console.log("login response", data);
      //   dispatch({
      //     type: "LOGIN",
      //     payload: { user: data.user, token: data.token },
      //   });
    }
  };

  return (
    <div>
      <div>
        <h1>Admin LOGIN</h1>
      </div>
      <div>
        <input
          type="email"
          placeholder="Enter your Email"
          value={adminLoginEmail}
          onChange={(e) => setAdminLoginEmail(e.target.value)}
        />
        <p>{adminLoginEmail}</p>
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter your password"
          value={adminLoginPassword}
          onChange={(e) => setAdminLoginPassword(e.target.value)}
        />
        <p>{adminLoginPassword}</p>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>{error && <span>{error}</span>}</div>
    </div>
  );
}

export default AdminLogin;
