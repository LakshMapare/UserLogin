import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};

    if (formData.email === "" || formData.email === null) {
      isvalid = false;
      validationErrors.email = "Email is required";
    } else if (/\s+@\s+\.\s+/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = "Email is not valid";
    }

    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationErrors.password = "password is required";
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationErrors.password = "password length at least 6 char";
    }

    axios.get("http://localhost:8080/user")
      .then(result => {
        result.data.map(user => {
          if (user.email === formData.email) {
            
            if (user.password === formData.password) {
              alert("Login successfuly");
              navigate('/Home')
            } else {
              isvalid = false;
              validationErrors.password = "Wrong Password;";
            }
            
          } else if (formData.email == "") {
            isvalid = false;
            validationErrors.email = "Enter email;";
          }else if (user.password === formData.password) {
            isvalid = false;
            validationErrors.email = "Enter valid email;";
          }
        });
        setErrors(validationErrors);
        setValid(isvalid);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="signup-form">
            <form
              action=""
              onSubmit={handlesubmit}
              className="mt-5 border p-4 bg-light shadow"
            >
              <h4 className="mb-5 text-secondary">User Login</h4>
              {valid ? (
                <></>
              ) : (
                <span className="text-danger">
                  {errors.email};{errors.password};
                </span>
              )}
              <div className="row">
                <div className="mb-3 col-md-12">
                  <label>
                    Email<span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                  />
                </div>

                <div className="mb-3 col-md-12">
                  <label>
                    Password<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    onChange={(event) =>
                      setFormData({ ...formData, password: event.target.value })
                    }
                  />
                </div>

                <div className="col-md-12">
                  <button className="btn btn-primary float-end">
                    Login Now
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center mt-3 text-secondary">
              Dont have account, Please{" "}
              <Link to="/">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
