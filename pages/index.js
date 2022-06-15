import React, { useState } from "react";
import { useContext } from "react";
import Context from "../components/Context";
import Advertisement from "../components/Advertisement";
import ProductCard from "../components/ProductCard";
import Head from "next/head";

export default function Home(props) {
  const { setIsError } = useContext(Context);
  const [discountProduct] = useState(() =>
    props.pageFound ? [props.data1, props.data2] : []
  );
  if (!props.pageFound) {
    setIsError({
      errorPage: true,
      status: props.status,
      message: props.message,
    });
  }
  return (
    <div>
      <Head>
        <title>Apna Shop </title>
      </Head>
      <Advertisement />
      {discountProduct.length !== 0 &&
        discountProduct.map((e) => {
          const discount = e[0].discount;
          let dealsName = "";
          if (discount === 90) {
            dealsName = "Lightning Deals Of the Day";
          } else if (50 <= discount && discount < 90) {
            dealsName = "More then 50% Discount";
          }
          return (
            <div className="container" key={e}>
              <h2 className="fst-italic mt-4">{dealsName}</h2>
              <div className="row">
                {e.map((e) => {
                  return <ProductCard e={e} key={e._id} />;
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/discount`);
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
  if (data.success === true && res.status === 200) {
    return {
      props: {
        pageFound: true,
        data1: data.response1,
        data2: data.response2,
      },
    };
  }
}
