import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { Navigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpasword] = useState("");
  const [password_confirmation, setpasswordConfirmation] = useState("");
  const [redirect, setRedirect] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    AuthService.register(name, email, password, password_confirmation).then(
      (response) => {
        console.log(response);
        setRedirect(true);
      }
    );
  };
  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="signup-form">
      <form
        action="/examples/actions/confirmation.php"
        method="post"
        className="form-horizontal"
      >
        <div className="row">
          <div className="col-8 offset-4">
            <h2>Sign Up</h2>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-form-label col-4">Username</label>
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              name="username"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-form-label col-4">Email Address</label>
          <div className="col-8">
            <input
              type="email"
              className="form-control"
              name="email"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-form-label col-4">Password</label>
          <div className="col-8">
            <input
              type="password"
              className="form-control"
              name="password"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-form-label col-4">Confirm Password</label>
          <div className="col-8">
            <input
              type="password"
              className="form-control"
              name="confirm_password"
              required="required"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-8 offset-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Sign Up
            </button>
          </div>
        </div>
      </form>
      <div className="text-center">
        Already have an account? <a href="/login">Login here</a>
      </div>
    </div>
  );
}
