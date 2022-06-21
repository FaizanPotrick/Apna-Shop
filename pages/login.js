import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { useContext } from "react";
import Context from "../components/Context";
import Head from "next/head";

function Login() {
  const { setIsAlert } = useContext(Context);
  const [login, setLogin] = useState({
    emailAddress: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState({
    emailAddress: "Invalid Email Address",
    password: "Invalid Password",
  });
  const onChange = (e) => {
    const { value, name } = e.target;
    setLogin(() => {
      return {
        ...login,
        [name]: value,
      };
    });
    e.target.classList.remove("is-invalid");
  };
  const loginData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailAddress: login.emailAddress,
        password: login.password,
      }),
      credentials: "include",
    });
    const data = await res.json();
    setIsLoading(false);
    if (data.success === false && res.status === 201) {
      const Key = Object.entries(data).pop();
      const target = document.getElementById(`login${Key[0]}`);
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
      setLogin({
        emailAddress: "",
        password: "",
      });
      Router.push("/");
    }
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "77.1vh" }}
    >
      <Head>
        <title>Apna Shop | Login</title>
      </Head>
      <div
        className="border shadow p-5 m-3"
        style={{ borderRadius: "20px", width: "500px" }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={loginData}>
          <div className="form-floating mb-4">
            <input
              type="email"
              value={login.emailAddress}
              name="emailAddress"
              id="loginemailAddress"
              className="form-control"
              placeholder="Email Address"
              onChange={onChange}
              required
            />
            <label
              className="form-label text-muted"
              htmlFor="loginemailAddress"
            >
              Email Address
            </label>
            <div className="invalid-feedback">{isValid.emailAddress}</div>
          </div>
          <div className="form-floating mb-2 position-relative">
            <input
              type="password"
              value={login.password}
              name="password"
              id="loginpassword"
              className="form-control"
              placeholder="Password"
              onChange={onChange}
              required
              autoComplete="off"
              minLength="6"
            />
            <label className="form-label text-muted" htmlFor="loginpassword">
              Password
            </label>
            <i
              className="bi bi-eye-slash-fill fs-5 position-absolute text-muted"
              style={{ top: "13px", right: "10px", cursor: "pointer" }}
              onClick={(e) => {
                const target = document.getElementById("loginpassword");
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
          <div className="d-flex justify-content-end align-items-center text-muted mb-3">
            <Link href="/forget_password">
              <span
                style={{ cursor: "pointer" }}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
              >
                Forgot password?
              </span>
            </Link>
          </div>
          <button type="submit" className="btn btn-warning btn-lg container">
            {isLoading ? <div className="spinner-border"></div> : "Login"}
          </button>
          <p className="text-center text-muted mt-2 m-0">
            Don&#39;t have an account?{" "}
            <Link href="/register">
              <span
                style={{ cursor: "pointer" }}
                onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                onMouseEnter={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
              >
                Register here
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
