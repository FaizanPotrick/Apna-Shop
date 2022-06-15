import React, { useState } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import { useContext } from "react";
import Context from "../components/Context";

function ProductCard({ e }) {
  const { setIsAlert } = useContext(Context);
  const [quantity, setQuantity] = useState(1);
  const cartData = async (i) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/myCart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth: Cookies.get("token"),
        id: i._id,
        productName: i.productName,
        quantity: quantity,
        category: i.category,
        subCategory: i.subcategory,
        discount: i.discount,
        price: i.price,
        seller: i.buyer,
        avaliability: i.avaliability,
        productImage: i.productimage,
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
      setIsAlert({
        alert: true,
        message: data.message,
      });
    }
  };
  const discountprice = e.price - e.price * (e.discount / 100);
  const stock = e.avaliability;
  let stockcheck = "";
  let color = "";
  if (1 <= stock && stock <= 10) {
    stockcheck = "Limited Stock";
    color = "warning";
  } else if (stock > 10) {
    stockcheck = "In Stock";
    color = "success";
  } else {
    stockcheck = "Out of Stock";
    color = "danger";
  }
  return (
    <div key={e._id} className="col-xl-3 col-lg-4 col-md-5 col-sm-6 mb-4">
      <div className="card h-100">
        <img
          src={e.productimage}
          className="card-img-top"
          style={{
            height: "300px",
            cursor: "pointer",
          }}
          onClick={() => {
            Router.push(`/${e.category}/${e.subcategory}/${e.productName}`);
          }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">
            {e.productName.length >= 50
              ? `${e.productName.substring(0, 40)}...`
              : e.productName && e.productName.length <= 20
              ? `${e.productName} | ${e.subcategory} | ${e.category}`
              : e.productName.substring(0, 50) && e.productName.length <= 30
              ? `${e.productName} | ${e.subcategory}`
              : e.productName.substring(0, 50)}
          </h5>
          <div className="card-text">
            <h4 className="fw-bold fst-italic">
              ₹{discountprice.toFixed(0)}{" "}
              <del className="text-danger fs-6">₹{e.price}</del>
            </h4>
            <h6 className="text-success">
              Save : ₹{e.price - discountprice.toFixed(0)} ({e.discount}%)
            </h6>
            <div className={`text-${color}`}>{stockcheck}</div>
            <div className="d-flex align-items-center mb-2">
              Qty
              <select
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                className="form-select ms-2"
                aria-label="Default select example"
                style={{ width: "60px", cursor: "pointer" }}
              >
                <option value="1" defaultValue>
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
          <div className="w-100 text-center">
            <button
              className="btn btn-warning mt-2 rounded-pill px-4 btn-lg"
              onClick={() => {
                if (Cookies.get("token") !== undefined) {
                  cartData(e);
                } else {
                  Router.push("/login");
                }
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
