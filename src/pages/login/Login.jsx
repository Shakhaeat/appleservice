import React, { useState } from "react";
import { Navigate } from "react-router";
import AuthService from "../../services/auth.service";
import "./login.css";
import icon from "../../images/icon.png";

import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    await AuthService.login(email, password)
      .then((result) => {
        // console.log(result);
        if (result) {
          setAuthTokens(true);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
        // setRedirect(true);
      })
      .catch((e) => {
        setIsError(true);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="row signin">
      <div className="col-12">
        <h2 className="text-center text-dark">Login Form</h2>
        <div className="card my-3">
          <form className="card-body cardbody-color p-lg-5" onSubmit={submit}>
            <div className="text-center">
              <img
                src={icon}
                className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px"
                alt="profile"
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-color px-5 mb-5 w-100">
                Login
              </button>
            </div>
            <div
              id="emailHelp"
              className="form-text text-center mb-5 text-dark"
            >
              Not Registered?{" "}
              <Link to="/register" className="text-dark fw-bold">
                {" "}
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
