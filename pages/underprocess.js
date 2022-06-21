import React, { useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { useContext } from "react";
import Context from "../components/Context";
import Head from "next/head";

function Underprocess(props) {
  const { setIsAlert, setIsError } = useContext(Context);
  const [cart] = useState(() => (props.pageFound ? props.underProcess : []));
  const [address] = useState(() => (props.pageFound ? props.address : []));
  const [shippingAddress, setShippingAddress] = useState(() =>
    props.pageFound ? props.address[0] : []
  );
  const [changeAddress, setChangeAddress] = useState({
    address: "",
    value: false,
  });
  if (!props.pageFound) {
    setIsError({
      errorPage: true,
      status: props.status,
      message: props.message,
    });
  }
  const [paymentMode, setPaymentMode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const orderCompleted = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/underProcess`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth: Cookies.get("token"),
        cart: cart,
        shippingAddress: shippingAddress,
        paymentMode: paymentMode,
        paymentStatus: paymentMode === "online" ? "paid" : "unpaid",
        deliveryCharge: 70,
      }),
    });
    const data = await res.json();
    setIsLoading(false);
    if (data.success === true && res.status === 200) {
      await Router.push("/orders");
      Router.reload();
    }
    if (data.success === false && res.status === 400) {
      setIsAlert({
        alert: true,
        message: data.message,
      });
    }
  };
  let subtotalprice = 0;
  let totalitems = 0;
  if (cart.length !== 0) {
    cart.map((e) => {
      totalitems++;
      subtotalprice = subtotalprice + (e.price - e.price * (e.discount / 100));
    });
  }
  return (
    <div className="container" style={{ minHeight: "77.1vh" }}>
      <Head>
        <title>Apna Shop | Under Process</title>
      </Head>
      <h1 className="pt-4">Under Process</h1>
      <hr />
      <div>
        <h3>Address</h3>
        {address.length === 0 && (
          <button
            onClick={() => Router.push("/address")}
            style={{ cursor: "pointer" }}
            className="btn btn-warning"
          >
            Add Address
          </button>
        )}
        {address.length !== 0 && (
          <div className="d-flex justify-content-between fs-5">
            {shippingAddress.street},{shippingAddress.landMark},
            {shippingAddress.city},{shippingAddress.district}-
            {shippingAddress.pinCode}
            <div className="d-flex text-muted justify-content-center">
              <div
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#selectaddressModal"
                onClick={() =>
                  setChangeAddress({
                    address: "shipping",
                    value: true,
                  })
                }
              >
                Change Address
              </div>
              <div className="text-muted fw-light mx-3">|</div>
              <div
                onClick={() => Router.push("/address")}
                style={{ cursor: "pointer" }}
              >
                Add Address
              </div>
            </div>
          </div>
        )}
        <div
          className="modal fade"
          id="selectaddressModal"
          tabIndex="-1"
          aria-labelledby="setaddressmodal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="setaddressmodal">
                  Select Address
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {address.map((e) => {
                    return (
                      <div className="col-sm-6 my-2" key={e._id}>
                        <div
                          className="border rounded text-center p-2 text-center h-100"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={() => {
                            changeAddress.address === "shipping"
                              ? setShippingAddress(e)
                              : setBillingAddress(e);
                            setChangeAddress({
                              address: "",
                              value: false,
                            });
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="fs-5">
                            {e.street},{e.landMark}
                          </div>
                          <div className="fs-5">
                            {e.city},{e.district}-{e.pinCode}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="mt-3">List of Products</h3>
        <div>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col" className="fs-5">
                  #
                </th>
                <th scope="col" className="fs-5">
                  Product
                </th>
                <th scope="col" className="fs-5 text-center">
                  Quantity
                </th>
                <th scope="col" className="fs-5 text-center">
                  Price
                </th>
              </tr>
            </thead>
            {cart.map((e, index) => {
              const discountprice = e.price - e.price * (e.discount / 100);
              return (
                <tbody key={e.id}>
                  <tr>
                    <th scope="row" className="align-middle">
                      {index + 1}
                    </th>
                    <td className="d-flex align-items-center">
                      <img
                        src={e.productImage}
                        width="100px"
                        height="100px"
                        className="rounded me-2"
                      />
                      <h5>{e.productName}</h5>
                    </td>
                    <td className="fw-bold text-center align-middle">
                      {e.quantity}
                    </td>
                    <td className="fw-bold text-center align-middle">
                      ₹{discountprice} + ₹70
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <hr />
          <div className="mt-2 d-flex align-items-center justify-content-between fs-4 mx-2 mb-3">
            <h4>Subtotal({totalitems} items)</h4>
            <h4>₹{subtotalprice + totalitems * 70}</h4>
          </div>
          <form onSubmit={orderCompleted}>
            <div className="mt-2 row fs-5">
              <div className="col-md-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    onChange={() => setPaymentMode("online")}
                    id="online"
                    required
                  />
                  <label className="form-check-label" htmlFor="online">
                    PayPal
                  </label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="payment"
                    onChange={() => setPaymentMode("offline")}
                    value=""
                    id="offline"
                    required
                  />
                  <label className="form-check-label" htmlFor="offline">
                    Cash on Delivery
                  </label>
                </div>
              </div>
              <button
                className="btn btn-dark btn-lg container mt-5 mb-3"
                type="submit"
              >
                {isLoading ? (
                  <div className="spinner-border"></div>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/underProcess?token=${context.req.cookies["token"]}`
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
      props: {
        pageFound: true,
        address: data.address,
        underProcess: data.underProcess.reverse(),
      },
    };
  }
}
export default Underprocess;
