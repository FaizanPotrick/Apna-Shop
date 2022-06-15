import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useContext } from "react";
import Context from "../components/Context";
import Head from "next/head";

function register() {
  const { setIsAlert } = useContext(Context);
  const [register, setRegister] = useState({
    fName: "",
    mName: "",
    lName: "",
    emailAddress: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    street: "",
    landMark: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",
    question1: "",
    question2: "",
    password: "",
    cPassword: "",
  });
  const [isValidation, setIsValidation] = useState({
    fName: false,
    lName: false,
    mName: false,
    emailAddress: false,
    phoneNumber: false,
    street: false,
    landMark: false,
    city: false,
    district: false,
    state: false,
    country: false,
    pinCode: false,
    password: false,
    cPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState({
    fName: "Enter valid Name",
    lName: "Enter valid Name",
    mName: "Enter valid Name",
    emailAddress: "Enter valid Email Address",
    phoneNumber: "Enter valid Phone Number",
    street: "Enter valid Street",
    landMark: "Enter valid Landmark",
    city: "Enter valid City",
    district: "Enter valid District",
    state: "Enter valid State",
    country: "Enter valid Country",
    pinCode: "Enter valid Pincode",
    password: "Contain alphabet, number and special character",
    cPassword: "Password didn't match",
  });
  const onChange = (e) => {
    const { value, name } = e.target;
    setRegister(() => {
      return {
        ...register,
        [name]: value,
      };
    });
  };
  const registerData = async (e) => {
    e.preventDefault();
    document.getElementById("registerfill").innerText = "";
    const value = Object.values(isValidation).filter((e) => {
      return e === false;
    });
    if (value.length !== 0) {
      return (document.getElementById("registerfill").innerText =
        "Please fill the form correctly");
    }
    setIsLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fName: register.fName,
        mName: register.mName,
        lName: register.lName,
        emailAddress: register.emailAddress,
        phoneNumber: register.phoneNumber,
        birthDate: register.birthDate,
        gender: register.gender,
        street: register.street,
        landMark: register.landMark,
        city: register.city,
        district: register.district,
        state: register.state,
        country: register.country,
        pinCode: register.pinCode,
        question1: register.question1,
        question2: register.question2,
        password: register.password,
        cPassword: register.cPassword,
      }),
    });
    const data = await res.json();
    setIsLoading(false);
    if (data.success === false && res.status === 201) {
      const Key = Object.entries(data).pop();
      const target = document.getElementById(`register${Key[0]}`);
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
      setRegister({
        fName: "",
        mName: "",
        lName: "",
        emailAddress: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        street: "",
        landMark: "",
        city: "",
        district: "",
        state: "",
        country: "",
        pinCode: "",
        question1: "",
        question2: "",
        password: "",
        cPassword: "",
      });
      Router.push("/");
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
    <div className="d-flex align-items-center justify-content-center">
       <Head>
        <title>Apna Shop | Register</title>
      </Head>
      <div
        className="border p-5 shadow m-3"
        style={{ borderRadius: "20px", maxWidth: "800px" }}
      >
        <h1 className="text-center mb-5">Create an Account</h1>
        <form onSubmit={registerData}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.fName}
                  name="fName"
                  id="registerfName"
                  className="form-control"
                  placeholder="First Name"
                  maxLength="20"
                  minLength="4"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([ a-zA-Z]+)$/;
                    regexValidation(e, regex);
                  }}
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerfName"
                >
                  First Name
                </label>
                <div className="invalid-feedback">{isValid.fName}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.mName}
                  name="mName"
                  id="registermName"
                  className="form-control"
                  placeholder="Middle Name"
                  maxLength="20"
                  minLength="4"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([ a-zA-Z]+)$/;
                    regexValidation(e, regex);
                  }}
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registermName"
                >
                  Middle Name
                </label>
                <div className="invalid-feedback">{isValid.mName}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.lName}
                  name="lName"
                  id="registerlName"
                  className="form-control"
                  placeholder="Last Name"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([ a-zA-Z]+)$/;
                    regexValidation(e, regex);
                  }}
                  maxLength="20"
                  minLength="4"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerlName"
                >
                  Last Name
                </label>
                <div className="invalid-feedback">{isValid.lName}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="email"
                  value={register.emailAddress}
                  name="emailAddress"
                  id="registeremailAddress"
                  className="form-control"
                  placeholder="Email Address"
                  onChange={(e) => {
                    onChange(e);
                    const regex =
                      /^[a-zA-Z]([a-zA-Z0-9_.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]){2,6}$/;
                    regexValidation(e, regex);
                  }}
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registeremailAddress"
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
                  value={register.phoneNumber}
                  name="phoneNumber"
                  id="registerphoneNumber"
                  className="form-control"
                  placeholder="Phone Number"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([0-9]+)$/;
                    regexValidation(e, regex);
                  }}
                  minLength="10"
                  maxLength="10"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerphoneNumber"
                >
                  Phone Number
                </label>
                <div className="invalid-feedback">{isValid.phoneNumber}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-floating mb-4">
                <input
                  type="date"
                  value={register.birthDate}
                  name="birthDate"
                  id="registerbirthDate"
                  className="form-control"
                  onChange={onChange}
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerbirthDate"
                >
                  Date of Birth
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <h6>Gender:</h6>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="registerfemale"
                    value="Female"
                    onChange={onChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="registerfemale">
                    Female
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="registermale"
                    value="Male"
                    onChange={onChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="registermale">
                    Male
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="registerother"
                    value="Other"
                    onChange={onChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="registerother">
                    Other
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.street}
                  name="street"
                  id="registerstreet"
                  className="form-control"
                  placeholder="Street"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([ a-zA-Z,/.-]+)$/;
                    regexValidation(e, regex);
                  }}
                  maxLength="100"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerstreet"
                >
                  Street
                </label>
                <div className="invalid-feedback">{isValid.street}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.landMark}
                  name="landMark"
                  id="registerlandMark"
                  className="form-control"
                  placeholder="Land Mark"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([ a-zA-Z,/.-]+)$/;
                    regexValidation(e, regex);
                  }}
                  maxLength="100"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerlandMark"
                >
                  Land Mark
                </label>
                <div className="invalid-feedback">{isValid.landMark}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.city}
                  name="city"
                  id="registercity"
                  className="form-control"
                  placeholder="City"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([ a-zA-Z,/.-]+)$/;
                    regexValidation(e, regex);
                  }}
                  maxLength="20"
                  required
                />
                <label className="form-label text-muted" htmlFor="registercity">
                  City
                </label>
                <div className="invalid-feedback">{isValid.city}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.district}
                  name="district"
                  id="registerdistrict"
                  className="form-control"
                  placeholder="District"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([ a-zA-Z,/.-]+)$/;
                    regexValidation(e, regex);
                  }}
                  maxLength="20"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerdistrict"
                >
                  District
                </label>
                <div className="invalid-feedback">{isValid.district}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.state}
                  name="state"
                  id="registerstate"
                  className="form-control"
                  placeholder="State"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([ a-zA-Z,/.-]+)$/;
                    regexValidation(e, regex);
                  }}
                  maxLength="20"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerstate"
                >
                  State
                </label>
                <div className="invalid-feedback">{isValid.state}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.country}
                  name="country"
                  id="registercountry"
                  className="form-control"
                  placeholder="Country"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([ a-zA-Z,/.-]+)$/;
                    regexValidation(e, regex);
                  }}
                  maxLength="20"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registercountry"
                >
                  Country
                </label>
                <div className="invalid-feedback">{isValid.country}</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.pinCode}
                  name="pinCode"
                  id="registerpinCode"
                  className="form-control"
                  placeholder="Pin Code"
                  onChange={(e) => {
                    onChange(e);
                    const regex = /^([0-9]+)$/;
                    regexValidation(e, regex);
                  }}
                  maxLength="10"
                  minLength="6"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerpinCode"
                >
                  Pin Code
                </label>
                <div className="invalid-feedback">{isValid.pinCode}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.question1}
                  name="question1"
                  id="registerquestion1"
                  className="form-control"
                  placeholder="What is your favorite city?"
                  onChange={onChange}
                  maxLength="100"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerquestion1"
                >
                  What is your favorite city?
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-4">
                <input
                  type="text"
                  value={register.question2}
                  name="question2"
                  id="registerquestion2"
                  className="form-control"
                  placeholder="District"
                  onChange={onChange}
                  maxLength="100"
                  required
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerquestion2"
                >
                  What is your favorite food?
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-floating position-relative mb-4">
                <input
                  type="password"
                  value={register.password}
                  name="password"
                  id="registerpassword"
                  className="form-control"
                  placeholder="Password"
                  minLength="6"
                  onChange={(e) => {
                    onChange(e);
                    const regex =
                      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]+)$/;
                    regexValidation(e, regex);
                  }}
                  required
                  autoComplete="off"
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registerpassword"
                >
                  Password
                </label>
                <i
                  className="bi bi-eye-slash-fill fs-5 position-absolute text-muted"
                  style={{ top: "13px", right: "10px", cursor: "pointer" }}
                  onClick={(e) => {
                    const target = document.getElementById("registerpassword");
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
              <div className="form-floating position-relative mb-4">
                <input
                  type="password"
                  value={register.cPassword}
                  name="cPassword"
                  id="registercPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  minLength="6"
                  onChange={(e) => {
                    const { value, name } = e.target;
                    onChange(e);
                    if (value !== register.password) {
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
                  required
                  autoComplete="off"
                />
                <label
                  className="form-label text-muted"
                  htmlFor="registercPassword"
                >
                  Confirm Password
                </label>
                <i
                  className="bi bi-eye-slash-fill fs-5 position-absolute text-muted"
                  style={{ top: "13px", right: "10px", cursor: "pointer" }}
                  onClick={(e) => {
                    const target = document.getElementById("registercPassword");
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
          <div id="registerfill" className="text-danger text-center mb-1"></div>
          <button type="submit" className="btn btn-warning btn-lg container">
            {isLoading ? <div className="spinner-border"></div> : "Register"}
          </button>
          <p className="text-center text-muted mt-2">
            Have already an account?{" "}
            <Link href="/login">
              <span
                style={{ cursor: "pointer" }}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
              >
                Login here
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default register;
