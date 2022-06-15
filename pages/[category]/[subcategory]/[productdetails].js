import React, { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Cookies from "js-cookie";
import { useContext } from "react";
import Context from "../../../components/Context";
import Head from "next/head";

function productdetails(props) {
  const router = useRouter();
  const context = useContext(Context);
  const { setIsAlert, setIsError } = context;
  const [quantity, setQuantity] = useState(1);
  const [product] = useState(() => (props.pageFound ? props.data : []));
  const { category, subcategory, productdetails } = router.query;
  if (!props.pageFound) {
    setIsError({
      errorPage: true,
      status: props.status,
      message: props.message,
    });
  }
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
      Router.push("/mycart");
    }
  };
  const buyData = async (e) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/underProcess`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth: Cookies.get("token"),
        cart: e,
        quantity: quantity,
      }),
    });
    const data = await res.json();
    if (data.success === false && res.status === 400) {
      setIsAlert({
        alert: true,
        message: data.message,
      });
    }
    if (data.success === true && res.status === 200) {
      Router.push("/underprocess");
    }
  };
  return (
    <div className="container" style={{ minHeight: "77.1vh" }}>
      <Head>
        <title>Apna Shop | {productdetails}</title>
      </Head>
      <h4 className="d-flex pt-4">
        <a className="text-dark" href={`/${category}`}>
          {category}
        </a>
        /
        <a className="text-dark" href={`/${category}/${subcategory}`}>
          {subcategory}
        </a>
        /{productdetails}
      </h4>
      <div
        className="d-flex align-center"
        style={{
          minHeight: "66vh",
        }}
      >
        {product.map((e) => {
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
            <div className="row my-3" key={e._id}>
              <div className="col-md-5 col-sm-12 text-center">
                <img src={e.productimage} className="img-fluid rounded h-100" />
              </div>
              <div className="col-md-7 col-sm-12">
                <div>
                  <h3 className="border-bottom pb-3 fw-bold">
                    {e.productName} | {e.subcategory} | {e.category}
                  </h3>
                  <h5 className="fst-italic">
                    MRP : ₹{discountprice.toFixed(0)}{" "}
                    <del className="text-danger">₹{e.price}</del>
                  </h5>
                  <h5 className="text-success">
                    Save : ₹{e.price - discountprice.toFixed(0)} ({e.discount}%)
                  </h5>
                  <div className="d-flex justify-content-between">
                    <h5 className={`text-${color} fw-normal`}>{stockcheck}</h5>
                    <h6 className="fst-italic">Seller : {e.buyer}</h6>
                  </div>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Velit officia autem ipsa voluptas praesentium vitae,
                    architecto perspiciatis at laborum quibusdam, sunt
                    voluptatem quas rem, laudantium eveniet alias. Beatae nihil
                    architecto vitae quae itaque quo eum sit a. Doloremque optio
                    illo aliquam corrupti delectus exercitationem, dolor
                    reiciendis alias, repellat et facere?
                  </p>
                  <div className="border-top py-3 d-flex">
                    <div className="border border-muted p-3 me-2 text-center rounded text-muted bg-light">
                      <i className="bi bi-credit-card fs-2"></i>
                      <div className="text-muted">Pay on Deleivery</div>
                    </div>
                    <div className="border border-muted p-3 ms-2 text-center rounded text-muted bg-light">
                      <i className="bi bi-box2 fs-2"></i>
                      <div className="text-muted">7 Days Replacement</div>
                    </div>
                  </div>
                  <div className="border-top pt-3">
                    <div className="d-flex align-items-center mb-4">
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
                    <button
                      className="btn btn-warning me-2 rounded btn-lg"
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
                    <button
                      className="btn btn-warning ms-2 rounded btn-lg"
                      onClick={() => {
                        if (Cookies.get("token") !== undefined) {
                          buyData(e);
                        } else {
                          Router.push("/login");
                        }
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/${context.query.category}/${context.query.subcategory}/${context.query.productdetails}`
  );
  const data = await res.json();
  if (data.success === false && res.status === 500) {
    return {
      props: {
        pageFound: false,
        status: res.status,
        message: data.message,
      },
    };
  }
  if (data.success === false && res.status === 404) {
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
        data: data.response,
      },
    };
  }
}
export default productdetails;
