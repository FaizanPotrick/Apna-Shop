import React from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { useContext } from "react";
import Context from "../components/Context";

function MyCartCard({ e, onChange, discountprice }) {
  const { setIsAlert } = useContext(Context);
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <img
            src={e.productImage}
            className="img-fluid rounded w-100"
            alt="..."
            style={{
              height: "220px",
              cursor: "pointer",
            }}
            onClick={() => {
              Router.push(`/${e.category}/${e.subCategory}/${e.productName}`);
            }}
          />
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <h3 className="card-title">
              {e.productName} | {e.subCategory} | {e.category}
            </h3>
            <h3 className="fst-italic">₹{discountprice.toFixed(0)}</h3>
            <div className="fs-5 text-success">
              Save : ₹{e.price - discountprice.toFixed(0)} ({e.discount}
              %)
            </div>
            <div className="fs-5 fst-italic">
              Sold by : <strong>{e.seller}</strong>
            </div>
            <div className="fs-5 d-flex align-items-center">
              <div className="d-flex align-items-center">
                Qty
                <select
                  defaultValue={e.quantity.toString()}
                  className="form-select ms-2"
                  onChange={(i) => {
                    onChange(i.target.value, e);
                  }}
                  aria-label="Default select example"
                  style={{ width: "60px", cursor: "pointer" }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="ms-2">
                <i
                  className="bi bi-trash text-warning fs-4 btn"
                  onClick={async () => {
                    const res = await fetch(
                      `${process.env.NEXT_PUBLIC_URL}/api/myCart`,
                      {
                        method: "DELETE",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          auth: Cookies.get("token"),
                          id: e.id,
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
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCartCard;
