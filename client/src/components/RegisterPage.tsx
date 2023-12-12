// import { useForm } from "react-hook-form";
// import { useState } from "react";
import "./RegisterPage.css";

// type FormSeletion = {
//   login: string;
//   register: string;
//   resetPassword: string;
// };

const RegisterPage = () => {
  // const {
  //   register,
  //   formState: { errors },
  // } = useForm();

  return (
    <div className="mycontainer">
      <form className="auth-form" action="">
        <h1>Login</h1>

        <div className="input-container">
          <input type="text" placeholder="Username" required />
          <i className="bx bxs-user"></i>
        </div>

        <div className="input-container">
          <input type="password" placeholder="Password" required />
          <i className="bx bxs-lock-alt"></i>
        </div>

        <div className="remember-forget">
          <div className="remember-container">
            <label htmlFor="remember"></label>
            <input name="remember" type="checkbox" />
            Remember Me
          </div>
          <a href="/">Forgot password?</a>
        </div>

        <button className="btn" type="submit">
          Login
        </button>

        <div className="social-media">
          <p>Or Login with</p>
          <a href="/">
            {/* <i className="bx bxl-google-plus-circle"></i> */}
            <i className="bx bxl-google"></i>
          </a>
        </div>

        <div className="register-link">
          <p>
            Don't have an account? <a href="/">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
