import React, { useState } from "react";
import Router from "next/router";
import { useContext } from "react";
import Context from "../components/Context";
import Head from "next/head";

function Forgetpassword() {
  const { setIsAlert } = useContext(Context);
  const [forgetPassword, setForgetPassword] = useState({
    emailAddress: "",
    phoneNumber: "",
    birthDate: "",
    question1: "",
    question2: "",
    password: "",
    cPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValidation, setIsValidation] = useState({
    password: false,
    cPassword: false,
  });
  const [isValid, setIsValid] = useState({
    emailAddress: "Enter valid Email Address",
    phoneNumber: "Enter valid Phone Number",
    birthDate: "Enter valid Date of Birth",
    question1: "Wrong Answer",
    question2: "Wrong Answer",
    password: "Contain alphabet, number and special character",
    cPassword: "Password didn't match",
  });
  const onChange = (e) => {
    const { value, name } = e.target;
    setForgetPassword(() => {
      return {
        ...forgetPassword,
        [name]: value,
      };
    });
  };
  const ForgetPasswordData = async (e) => {
    e.preventDefault();
    document.getElementById("forgetpasswordfill").innerText = "";
    Object.values(isValidation).filter((e) => {
      if (e === false) {
        return (document.getElementById("forgetpasswordfill").innerText =
          "Please fill the form correctly");
      }
    });
    setIsLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailAddress: forgetPassword.emailAddress,
        phoneNumber: forgetPassword.phoneNumber,
        birthDate: forgetPassword.birthDate,
        question1: forgetPassword.question1,
        question2: forgetPassword.question2,
        password: forgetPassword.password,
        cPassword: forgetPassword.cPassword,
      }),
    });
    const data = await res.json();
    setIsLoading(false);
    if (data.success === false && res.status === 201) {
      const Key = Object.entries(data).pop();
      const target = document.getElementById(`forgetpassword${Key[0]}`);
      target.classList.add("is-invalid");
      setIsValid({
        ...isValid,
        [Key[0]]: Key[1],
      });
    }
    if (data.success === false && res.status === 400) {
      setIsAlert({
        alert: true,
        message: data.message,
      });
    }
    if (data.success === true && res.status === 200) {
      setForgetPassword({
        emailAddress: "",
        phoneNumber: "",
        birthDate: "",
        question1: "",
        question2: "",
        password: "",
        cPassword: "",
      });
      Router.push("/login");
    }
  };
  const regexValidation = (e, regex) => {
    const { value, name } = e.target;
    if (value === "") {
      return (
        setIsValidation({ ...isValidation, [name]: false }),
        e.target.classList.remove("is-invalid"),
        e.target.classList.remove("is-valid")
      );
    }
    if (!regex.test(value)) {
      return (
        setIsValidation({ ...isValidation, [name]: false }),
        e.target.classList.add("is-invalid"),
        e.target.classList.remove("is-valid")
      );
    }
    setIsValidation({ ...isValidation, [name]: true });
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "77.1vh" }}
    >
      <Head>
        <title>Apna Shop | Forget Password</title>
      </Head>
      <div
        className="border shadow p-5 m-3"
        style={{ borderRadius: "20px", width: "700px" }}
      >
        <h2 className="text-center mb-4"> Forget Password</h2>
        <form onSubmit={ForgetPasswordData}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="email"
                  value={forgetPassword.emailAddress}
                  name="emailAddress"
                  id="forgetpasswordemailAddress"
                  className="form-control"
                  placeholder="Email Address"
                  onChange={onChange}
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="forgetpasswordemailAddress"
                >
                  Email Address
                </label>
                <div className="invalid-feedback">{isValid.emailAddress}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={forgetPassword.phoneNumber}
                  name="phoneNumber"
                  id="forgetpasswordphoneNumber"
                  className="form-control"
                  placeholder="Phone Number"
                  minLength="10"
                  maxLength="10"
                  required
                  onChange={onChange}
                />
                <label
                  className="form-label text-muted"
                  htmlFor="forgetpasswordphoneNumber"
                >
                  Phone Number
                </label>
                <div className="invalid-feedback">{isValid.phoneNumber}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="date"
                  value={forgetPassword.birthDate}
                  name="birthDate"
                  id="forgetpasswordbirthDate"
                  className="form-control"
                  onChange={onChange}
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="forgetpasswordbirthDate"
                >
                  Date of Birth
                </label>
                <div className="invalid-feedback">{isValid.birthDate}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={forgetPassword.question1}
                  name="question1"
                  id="forgetpasswordquestion1"
                  className="form-control"
                  placeholder="What is your favourite city?"
                  onChange={onChange}
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="forgetpasswordquestion1"
                >
                  What is your favourite city?
                </label>
                <div className="invalid-feedback">{isValid.question1}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={forgetPassword.question2}
                  name="question2"
                  id="forgetpasswordquestion2"
                  className="form-control"
                  placeholder="What is your favourite food?"
                  onChange={onChange}
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="forgetpasswordquestion2"
                >
                  What is your favourite food?
                </label>
                <div className="invalid-feedback">{isValid.question2}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="password"
                  value={forgetPassword.password}
                  name="password"
                  id="forgetpasswordpassword"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => {
                    onChange(e);
                    const regex =
                      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]+)$/;
                    regexValidation(e, regex);
                  }}
                  minLength="6"
                  autoComplete="off"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="forgetpasswordpassword"
                >
                  Password
                </label>
                <i
                  className="bi bi-eye-slash-fill fs-5 position-absolute text-muted"
                  style={{ top: "13px", right: "10px", cursor: "pointer" }}
                  onClick={(e) => {
                    const target = document.getElementById(
                      "forgetpasswordpassword"
                    );
                    const type =
                      target.getAttribute("type") === "password"
                        ? "text"
                        : "password";
                    target.setAttribute("type", type);
                    if (e.target.classList.contains("bi-eye-slash-fill")) {
                      e.target.classList.remove("bi-eye-slash-fill");
                      e.target.classList.add("bi-eye-fill");
                    } else {
                      e.target.classList.remove("bi-eye-fill");
                      e.target.classList.add("bi-eye-slash-fill");
                    }
                  }}
                ></i>
                <div className="invalid-feedback">{isValid.password}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="password"
                  value={forgetPassword.cPassword}
                  name="cPassword"
                  id="forgetpasswordcPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    const { value, name } = e.target;
                    onChange(e);
                    if (value !== forgetPassword.password) {
                      return (
                        setIsValidation({ ...isValidation, [name]: false }),
                        e.target.classList.add("is-invalid"),
                        e.target.classList.remove("is-valid")
                      );
                    } else if (value === "") {
                      return (
                        setIsValidation({ ...isValidation, [name]: false }),
                        e.target.classList.remove("is-valid"),
                        e.target.classList.remove("is-invalid")
                      );
                    }
                    setIsValidation({ ...isValidation, [name]: true });
                    e.target.classList.add("is-valid");
                    e.target.classList.remove("is-invalid");
                  }}
                  autoComplete="off"
                  minLength="6"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="forgetpasswordcPassword"
                >
                  Confirm Password
                </label>
                <i
                  className="bi bi-eye-slash-fill fs-5 position-absolute text-muted"
                  style={{ top: "13px", right: "10px", cursor: "pointer" }}
                  onClick={(e) => {
                    const target = document.getElementById(
                      "forgetpasswordcPassword"
                    );
                    const type =
                      target.getAttribute("type") === "password"
                        ? "text"
                        : "password";
                    target.setAttribute("type", type);
                    if (e.target.classList.contains("bi-eye-slash-fill")) {
                      e.target.classList.remove("bi-eye-slash-fill");
                      e.target.classList.add("bi-eye-fill");
                    } else {
                      e.target.classList.remove("bi-eye-fill");
                      e.target.classList.add("bi-eye-slash-fill");
                    }
                  }}
                ></i>
                <div className="invalid-feedback">{isValid.cPassword}</div>
              </div>
            </div>
          </div>
          <div
            id="forgetpasswordfill"
            className="text-danger text-center mb-1"
          ></div>
          <button type="submit" className="btn btn-warning btn-lg container">
            {isLoading ? <div className="spinner-border"></div> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Forgetpassword;
