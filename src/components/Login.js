import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../api/atlantis-api";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const { data, error } = await login(loginEmail, loginPassword);
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
        <h1>LOGIN</h1>
      </div>
      <div>
        <input
          type="email"
          placeholder="Enter your Email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <p>{loginEmail}</p>
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter your password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <p>{loginPassword}</p>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>{error && <span>{error}</span>}</div>
    </div>
  );
}

export default Login;
