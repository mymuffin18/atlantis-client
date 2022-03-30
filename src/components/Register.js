import React, { useState } from "react";
import { register } from "../api/atlantis-api";

function Register() {
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState([]);
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState("");

  const handleRegister = async (e) => {
    if (registerPassword !== registerConfirmPassword) {
      setPassError("password Not Matched");
      setRegisterEmail({ email: "" });
      setRegisterPassword({ password: "" });
      setRegisterConfirmPassword({ confirmPassword: "" });
    } else {
      e.preventDefault();
      setLoading(true);
      setPassError("");
      const [data, errors] = await register(
        registerFirstName,
        registerLastName,
        registerEmail,
        registerPassword
      );
      if (Object.keys(errors).length > 0) {
        setEmailErrors(errors.email);
        setPassError(errors.password);
        setRegisterEmail({ email: "" });
        setRegisterPassword({ password: "" });
        setRegisterConfirmPassword({ confirmPassword: "" });
      } else {
        setFlash("Successful register");
        setEmailErrors("");
        setPassError("");
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Register</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your First Name"
          value={registerFirstName}
          onChange={(e) => setRegisterFirstName(e.target.value)}
        />
        <p>{registerFirstName}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your Last Name"
          value={registerLastName}
          onChange={(e) => setRegisterLastName(e.target.value)}
        />
        <p>{registerLastName}</p>
      </div>
      <div>
        <input
          type="email"
          placeholder="Enter your Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />
        <p>{registerEmail}</p>
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter your password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <p>{registerPassword}</p>
      </div>
      <div>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;
