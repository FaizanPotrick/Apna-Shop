import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import Cookies from "js-cookie";
import { useContext } from "react";
import Context from "../components/Context";

function Navbar() {
  const { isAlert } = useContext(Context);
  const router = useRouter();
  const { searching } = router.query;
  const [search, setSearch] = useState(searching);
  const [token, setToken] = useState();
  const [user, setUser] = useState({
    name: "",
    quantity: 0,
  });

  useEffect(() => {
    const userData = async () => {
      const res = await fetch("/api/navbar", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: Cookies.get("token"),
        }),
      });
      const data = await res.json();
      if (data.success === false && res.status === 201) {
        setUser([]);
      }
      if (data.success === true && res.status === 200) {
        setUser({
          name: data.name,
          quantity: data.quantity,
        });
      }
    };
    userData();
    setToken(() => {
      const cookie = Cookies.get("token");
      return cookie;
    });
  }, [router.isReady, Cookies.get("token"), isAlert]);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark px-5"
      style={{ height: "8vh", zIndex: 5 }}
    >
      <Link href="/">
        <h2 className="text-light fst-italic" style={{ cursor: "pointer" }}>
          <i className="bi bi-cart3 fs-1 me-2 text-warning"></i>Apna Shop
        </h2>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form
          className="d-flex border rounded mx-auto bg-light"
          style={{ width: "500px" }}
        >
          <input
            className="form-control input-group border-0"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            name="search"
            type="search"
            placeholder="Search"
          />
          <button
            className="btn text-warning"
            onClick={async (e) => {
              e.preventDefault();
              await Router.push(`/search?searching=${search}`);
              Router.reload();
            }}
          >
            <i className="bi bi-search fs-5"></i>
          </button>
        </form>
        {token !== undefined ? (
          <ul className="navbar-nav d-flex align-items-end justify-content-center">
            <li className="nav-item">
              <Link href="/orders">
                <span className="btn nav-link text-light">
                  <div className="lh-1 text-start">My</div>
                  <div>Orders</div>
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/mycart">
                <span className="btn nav-link text-light d-flex align-items-end">
                  <i className="bi bi-cart3 fs-2 position-relative">
                    <div
                      className="fs-6 position-absolute text-warning"
                      style={{ right: "-20px", top: "6px" }}
                    >
                      {user.quantity}
                    </div>
                  </i>
                  Cart
                </span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link text-light"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="lh-1 fw-light text-start">Hello,</div>
                <div>{user.name}</div>
              </span>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link href="/address">
                    <div className="dropdown-item btn">Address</div>
                  </Link>
                </li>
                <li>
                  <div
                    className="dropdown-item btn"
                    onClick={() => {
                      Router.push("/login");
                      Cookies.remove("token");
                    }}
                  >
                    Switch Account
                  </div>
                </li>
                <li>
                  <div
                    className="dropdown-item btn"
                    onClick={() => {
                      Router.push("/");
                      Cookies.remove("token");
                    }}
                  >
                    Log out
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav d-flex align-items-end justify-content-center">
            <li className="nav-item">
              <Link href="/register">
                <div className="btn btn-warning mx-2">Register</div>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login">
                <div className="btn btn-warning mx-2">Login</div>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
