import React, { useState } from "react";
import moment from "moment";
import { useContext } from "react";
import Context from "../components/Context";
import MyOrderCard from "../components/MyOrderCard";
import Head from "next/head";

function Orders(props) {
  const { setIsError } = useContext(Context);
  const [order] = useState(() => (props.pageFound ? props.data : []));
  if (!props.pageFound) {
    setIsError({
      errorPage: true,
      status: props.status,
      message: props.message,
    });
  }
  return (
    <div className="container" style={{ minHeight: "77.1vh" }}>
      <Head>
        <title>Apna Shop | Orders</title>
      </Head>
      <div>
        <h1 className="text-start pt-4">Orders</h1>
        <hr />
        {order.length === 0 && (
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
        {order.length !== 0 &&
          order.map((e) => {
            const today = new Date();
            let dayType = moment(e.deliveredOn).format("DD MMMM");
            if (
              moment(e.deliveredOn).format("DD-MMMM") ===
              moment(
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 1,
                  today.getHours(),
                  today.getMinutes(),
                  today.getSeconds()
                )
              ).format("DD-MMMM")
            ) {
              dayType = "Tomorrow";
            } else if (
              moment(e.deliveredOn).format("DD-MMMM") ===
              moment(new Date()).format("DD-MMMM")
            ) {
              dayType = "Today";
            }
            return <MyOrderCard key={e._id} e={e} dayType={dayType} />;
          })}
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/orders?token=${context.req.cookies["token"]}`
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

export default Orders;
