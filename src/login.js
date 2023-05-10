import React, { useState } from "react";
import "./login.css";
// import dashboard from "./dashboard";
import { useNavigate } from "react-router-dom";
import womanLogo from "./images/womanlogo.svg";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const navigate = useNavigate();
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
    // console.log('clickable')
  };

  return (
    <div className="login-page">
      <h2>Hello Again!!</h2>
      <div className="login">
        <div className="login__image">
          <img src={womanLogo} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
