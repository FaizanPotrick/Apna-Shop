import React, { useState } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import MyCartCard from "../components/MyCartCard";
import { useContext } from "react";
import Context from "../components/Context";
import Head from "next/head";

function Mycart(props) {
  const { setIsAlert, setIsError } = useContext(Context);
  const [myCart] = useState(() => (props.pageFound ? props.data : []));
  if (!props.pageFound) {
    setIsError({
      errorPage: true,
      status: props.status,
      message: props.message,
    });
  }
  const [isLoading, setIsLoading] = useState(false);
  const onChange = async (quantity, e) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/myCart`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth: Cookies.get("token"),
        id: e.id,
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
      Router.reload();
    }
  };

  let subTotalPrice = 0;
  myCart.map((e) => {
    subTotalPrice =
      subTotalPrice + e.quantity * (e.price - e.price * (e.discount / 100));
  });

  return (
    <div className="container" style={{ minHeight: "77.1vh" }}>
      <Head>
        <title>Apna Shop | My Cart</title>
      </Head>
      <h1 className="text-start pt-4">My Cart</h1>
      <hr />

      {myCart.length === 0 && (
        <div
          className="d-flex align-items-center justify-content-center position-relative"
          style={{ minHeight: "66vh" }}
        >
          <i
            className="bi bi-cart3 position-absolute"
            style={{
              fontSize: "200px",
              opacity: "0.2",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -70%)",
            }}
          ></i>
        </div>
      )}
      {myCart.length !== 0 &&
        myCart.map((e) => {
          const discountprice = e.price - e.price * (e.discount / 100);
          return (
            <MyCartCard
              key={e.id}
              e={e}
              onChange={onChange}
              discountprice={discountprice}
            />
          );
        })}
      {myCart.length !== 0 && (
        <div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-3">
            <h4>
              Subtotal({myCart.length} items): ₹{subTotalPrice}
            </h4>
            <button
              className="btn btn-warning btn-lg"
              onClick={async () => {
                setIsLoading(true);
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_URL}/api/underProcess`,
                  {
                    method: "PUT",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      auth: Cookies.get("token"),
                      cart: myCart,
                    }),
                  }
                );
                const data = await res.json();
                setIsLoading(false);
                if (data.success === false && res.status === 400) {
                  setIsAlert({
                    alert: true,
                    message: data.message,
                  });
                }
                if (data.success === true && res.status === 200) {
                  Router.push("/underprocess");
                }
              }}
            >
              {isLoading ? (
                <div className="spinner-border fw-light"></div>
              ) : (
                "Proceed to Buy"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/myCart?token=${context.req.cookies["token"]}`
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
        data: data.response.reverse(),
      },
    };
  }
}
export default Mycart;
