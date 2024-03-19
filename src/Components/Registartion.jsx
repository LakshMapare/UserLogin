import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registartion = () => {
  const [formData, setFormData] = useState({
    fname: "",
    Lname: "",
    email: "",
    city: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};
    if (formData.fname === "" || formData.fname === null) {
      isvalid = false;
      validationErrors.fname = "First name is required";
    }

    if (formData.Lname === "" || formData.Lname === null) {
      isvalid = false;
      validationErrors.Lname = "Last name is required";
    }

    if (formData.email === "" || formData.email === null) {
      isvalid = false;
      validationErrors.email = "Email is required";
    } else if (/\s+@\s+\.\s+/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = "Email is not valid";
    }

    if (formData.phone === "" || formData.phone === null) {
        isvalid = false;
        validationErrors.password = "phone num is required";
      } else if (formData.phone.length === 9) {
        isvalid = false;
        validationErrors.password = "please enter 10 digit num";
      }

      if (formData.city === "" || formData.city === null) {
        isvalid = false;
        validationErrors.Lname = "City name is required";
      }

    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationErrors.password = "password is required";
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationErrors.password = "password length at least 6 char";
    }

    if (formData.cpassword !== formData.password) {
      isvalid = false;
      validationErrors.cpassword = "C password not match";
    }

    setErrors(validationErrors);
    setValid(isvalid);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:8080/user", formData)
        .then((result) => {
          alert("Registered Successfully");
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container .wrapper">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="signup-form">
            <form
              action=""
              onSubmit={handlesubmit}
              className="mt-5 border p-4 bg-light shadow"
            >
              <h4 className="mb-5 text-secondary">Create Your Account</h4>
              {valid ? (
                <></>
              ) : (
                <span className="text-danger">
                  {errors.fname};{errors.Lname};{errors.email};{errors.password}
                  ;{errors.cpassword}
                </span>
              )}
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label>
                    First Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="fname"
                    className="form-control"
                    placeholder="Enter First Name"
                    onChange={(event) =>
                      setFormData({ ...formData, fname: event.target.value })
                    }
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label>
                    Last Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="Lname"
                    className="form-control"
                    placeholder="Enter Last Name"
                    onChange={(event) =>
                      setFormData({ ...formData, Lname: event.target.value })
                    }
                  />
                </div>

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
                    Phone<span className="text-danger">*</span>
                  </label>
                  <input
                    type="int"
                    name="phone"
                    className="form-control"
                    placeholder="Enter Phone number"
                    onChange={(event) =>
                      setFormData({ ...formData, phone: event.target.value })
                    }
                  />
                </div>

                <div className="mb-3 col-md-12">
                  <label>
                    City<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="form-control"
                    placeholder="Enter your city"
                    onChange={(event) =>
                      setFormData({ ...formData, city: event.target.value })
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
                <div className="mb-3 col-md-12">
                  <label>
                    Confirm Password<span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        cpassword: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-12">
                  <button className="btn btn-primary float-end">
                    Signup Now
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center mt-3 text-secondary">
              If you have account, Please <Link to="/Login">Login Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registartion;
