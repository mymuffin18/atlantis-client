import React, { useState } from "react";
import { admin_login } from "../api/atlantis-api";
import { useAdminAuth } from "../context/AdminAuthContextProvider";

function AdminLogin() {
  const [adminLoginEmail, setAdminLoginEmail] = useState("");
  const [adminLoginPassword, setAdminLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAdminAuth();

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await admin_login(
      adminLoginEmail,
      adminLoginPassword
    );
    if (error !== "") {
      console.log("this is error", error);
      setError(error);
      setLoading(false);
    } else {
      console.log("login response", data);
      setLoading(false);
      dispatch({
        type: "LOGIN",
        payload: { admin: data.admin, token: data.token },
      });
    }
  };

  return (
    <div>
      <div>
        <h1>Admin LOGIN</h1>
      </div>
      <div>
        {error && <span className="text-sm text-red-500">{error}</span>}
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
        <button onClick={handleLogin} disabled={loading}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
