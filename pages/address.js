import React, { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import AddressForm from "../components/AddressForm";
import { useContext } from "react";
import Context from "../components/Context";
import Head from "next/head";

function Address(props) {
  const { setIsAlert, setIsError } = useContext(Context);
  const [userAddress] = useState(() => (props.pageFound ? props.data : []));
  if (!props.pageFound) {
    setIsError({
      errorPage: true,
      status: props.status,
      message: props.message,
    });
  }
  const [address, setAddress] = useState({
    street: "",
    landMark: "",
    city: "",
    district: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const [isValid] = useState({
    street: "Enter valid Street",
    landMark: "Enter valid Landmark",
    city: "Enter valid City",
    district: "Enter valid District",
    state: "Enter valid State",
    country: "Enter valid Country",
    pinCode: "Enter valid Pincode",
  });
  const [oldAddressId, setOldAddressId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const onChange = (e) => {
    const { value, name } = e.target;
    setAddress(() => {
      return {
        ...address,
        [name]: value,
      };
    });
  };
  const addressData = async (e) => {
    e.preventDefault();
    document.getElementById("addressfill").innerText = "";
    if (
      !(
        !document
          .getElementById("addressstreet")
          .classList.contains("is-invalid") &&
        !document
          .getElementById("addresslandMark")
          .classList.contains("is-invalid") &&
        !document
          .getElementById("addresscity")
          .classList.contains("is-invalid") &&
        !document
          .getElementById("addressdistrict")
          .classList.contains("is-invalid") &&
        !document
          .getElementById("addressstate")
          .classList.contains("is-invalid") &&
        !document
          .getElementById("addresscountry")
          .classList.contains("is-invalid") &&
        !document
          .getElementById("addresspinCode")
          .classList.contains("is-invalid")
      )
    ) {
      return (document.getElementById("addressfill").innerText =
        "Please fill the form correctly");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/address`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth: Cookies.get("token"),
        street: address.street,
        landMark: address.landMark,
        city: address.city,
        district: address.district,
        state: address.state,
        country: address.country,
        pinCode: address.pinCode,
        id: oldAddressId,
        isEdit: isEdit,
      }),
    });
    const data = await res.json();
    if (data.success === false && res.status === 400) {
      setIsAlert({
        alert: true,
        message: data.message,
      });
    }
    if (data.success === false && res.status === 201) {
      return (document.getElementById("addressfill").innerText = data.message);
    }
    if (data.success === true && res.status === 200) {
      Router.reload();
      setAddress({
        street: "",
        landMark: "",
        city: "",
        district: "",
        state: "",
        country: "",
        pinCode: "",
      });
    }
  };
  const deleteAddressData = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/address`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth: Cookies.get("token"),
        id: id,
      }),
    });
    const data = await res.json();
    if (data.success === false && res.status === 201) {
      setIsAlert({
        alert: true,
        message: data.message,
      });
    }
    if (data.success === false && res.status === 400) {
      setIsAlert({
        alert: true,
        message: data.message,
      });
    }
    if (data.success === true && res.status === 200) {
      Router.reload();
    }
  };
  const regexValidation = (e, regex) => {
    const { value } = e.target;
    if (value === "") {
      return (
        e.target.classList.remove("is-invalid"),
        e.target.classList.remove("is-valid")
      );
    }
    if (!regex.test(value)) {
      return (
        e.target.classList.add("is-invalid"),
        e.target.classList.remove("is-valid")
      );
    }
    e.target.classList.add("is-valid");
    e.target.classList.remove("is-invalid");
  };
  return (
    <div
      className="position-relative d-flex justify-content-center align-items-start"
      style={{ minHeight: "77.1vh" }}
    >
      <Head>
        <title>Apna Shop | Address</title>
      </Head>
      <div
        className="shadow btn rounded btn-warning position-absolute bottom-0 end-0 m-3"
        data-bs-toggle="modal"
        data-bs-target="#AddressModal"
        onClick={() => {
          setIsEdit(false);
          setAddress({
            street: "",
            landMark: "",
            city: "",
            district: "",
            state: "",
            country: "",
            pinCode: "",
          });
        }}
        style={{ zIndex: 1 }}
      >
        <i className="bi bi-plus-circle-dotted fs-1"></i>
      </div>
      <div className="row container mt-4">
        <h1>Address</h1>
        <hr />
        {userAddress.length === 0 && (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "65.3vh" }}
          >
            <div
              style={{
                fontSize: "80px",
                opacity: "0.3",
              }}
            >
              No Address
            </div>
          </div>
        )}
        {userAddress.length !== 0 &&
          userAddress.map((e, i) => {
            return (
              <div className="col-md-3 col-sm-6 mb-4" key={e._id}>
                <div className="border rounded d-flex align-items-center justify-content-between flex-column py-3 text-center h-100 position-relative fs-5">
                  {i === 0 && (
                    <div
                      className="position-absolute fw-normal top-0 start-0 translate-middle badge rounded-pill bg-secondary"
                      style={{ fontSize: "12px" }}
                    >
                      Default
                    </div>
                  )}
                  <div>
                    {e.street},{e.landMark}
                  </div>
                  <div>
                    {e.city},{e.district}-{e.pinCode}
                  </div>
                  <div>
                    {e.state},{e.country}
                  </div>
                  <div className="d-flex justify-content-center w-100 align-items-center fs-5">
                    <a
                      className="me-3 text-muted"
                      data-bs-toggle="modal"
                      data-bs-target="#AddressModal"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setIsEdit(true);
                        setOldAddressId(e._id);
                        setAddress({
                          street: e.street,
                          landMark: e.landMark,
                          city: e.city,
                          district: e.district,
                          state: e.state,
                          country: e.country,
                          pinCode: e.pinCode,
                        });
                      }}
                    >
                      Edit
                    </a>
                    <div className="text-muted fw-light">|</div>
                    <a
                      className="ms-3 text-muted"
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteAddressData(e._id)}
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div
        className="modal fade"
        id="AddressModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Address</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <AddressForm
                addressData={addressData}
                address={address}
                onChange={onChange}
                regexValidation={regexValidation}
                isValid={isValid}
                isEdit={isEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/address?token=${context.req.cookies["token"]}`
  );
  const data = await res.json();
  if (data.success === false && res.status === 401) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  if (data.success === false && res.status === 500) {
    return {
      props: {
        pageFound: false,
        status: res.status,
        message: data.message,
      },
    };
  }
  if (data.success === true && res.status === 200) {
    return {
      props: { pageFound: true, data: data.response },
    };
  }
}
export default Address;
