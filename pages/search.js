import React, { useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import Context from "../components/Context";
import Head from "next/head";

function Search(props) {
  const router = useRouter();
  const { searching } = router.query;
  const { setIsError } = useContext(Context);

  const [searchProduct] = useState(() =>
    props.pageFound ? [props.data1, props.data2, props.data3] : []
  );
  if (!props.pageFound) {
    setIsError({
      errorPage: true,
      status: props.status,
      message: props.message,
    });
  }
  let count = 0;
  searchProduct.map((target) => {
    if (target !== undefined) {
      count = count + target.length;
    }
  });
  return (
    <div className="container" style={{ minHeight: "77.1vh" }}>
      <Head>
        <title>Apna Shop | {searching}</title>
      </Head>
      {count !== 0 && (
        <div>
          <h3 className="pt-4">Search - {searching}</h3>
          <h5>Total Result - {count}</h5>
        </div>
      )}
      {count === 0 && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "77.1vh" }}
        >
          <h1>OOPS!</h1>
          <h6>
            No Results about <u>{searching}</u>
          </h6>
        </div>
      )}
      {count !== 0 && (
        <div className="row">
          {searchProduct.map((target) => {
            if (target !== undefined) {
              return target.map((e) => {
                return <ProductCard e={e} key={e._id} />;
              });
            }
          })}
        </div>
      )}
    </div>
  );
}
export async function getServerSideProps(context) {
  if (context.query.searching === undefined) {
    return {
      props: {
        pageFound: false,
        status: 404,
        message: "Page Not Found",
      },
    };
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/search?searching=${context.query.searching}`
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
  if (data.success === true && res.status === 200) {
    return {
      props: {
        pageFound: true,
        data1: data.response1,
        data2: data.response2,
        data3: data.response3,
      },
    };
  }
}
export default Search;
