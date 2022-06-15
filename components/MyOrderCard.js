import React from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { useContext } from "react";
import Context from "../components/Context";
import moment from "moment";

function MyOrderCard({ e, dayType }) {
  const { setIsAlert } = useContext(Context);
  return (
    <div className="card mb-3">
      <h6 className="card-header text-muted">ORDER # {e.orderId}</h6>
      <div className="row">
        <div className="col-md-2">
          <img
            src={e.productImage}
            className="img-fluid rounded w-100"
            style={{
              height: "212px",
            }}
          />
        </div>
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title">
              {e.productName} | {e.subCategory} | {e.category}
            </h5>
            <div className="d-flex justify-content-between align-items-center">
              <h6 className="text-success">
                Order Placed : {moment(`${e.bookOn}`).format("DD MMMM YYYY")}
              </h6>
              <h5>{dayType}</h5>
            </div>
            <div className="d-flex align-items-center fs-6 justify-content-between">
              <h5>
                Price : <strong>₹{e.price}</strong>
              </h5>
              <div className="text-muted fs-6">
                {e.paymentMode !== "online" ? "Cash on Delivery" : "Paid"}
              </div>
            </div>
            <div className="d-flex">
              <h6
                className="dropdown-toggle nav-links"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Ship To
              </h6>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <div className="mx-3">
                    <div>
                      {e.address.street},{e.address.landMark}
                    </div>
                    <div>
                      {e.address.city},{e.address.district}-{e.address.pinCode}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div>Items : {e.quantity}</div>
            <div>
              <button
                className="btn btn-warning me-1 btn-sm"
                onClick={async () => {
                  const res = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/api/orders`,
                    {
                      method: "DELETE",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        auth: Cookies.get("token"),
                        id: e._id,
                      }),
                    }
                  );
                  const data = await res.json();
                  if (data.success === false && res.status === 400) {
                    setIsAlert({
                      alert: true,
                      message: data.message,
                    });
                  }
                  if (data.success === true && res.status === 200) {
                    Router.reload();
                  }
                }}
              >
                Cancel Product
              </button>
              <button
                className="btn btn-warning ms-1 btn-sm"
                onClick={() => {
                  Router.push(
                    `/${e.category}/${e.subCategory}/${e.productName}`
                  );
                }}
              >
                View Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyOrderCard;
