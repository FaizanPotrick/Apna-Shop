import React, { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import ProductCard from "../../components/ProductCard";
import { useContext } from "react";
import Context from "../../components/Context";
import Head from "next/head";

function index(props) {
  const context = useContext(Context);
  const { setIsError, data } = context;
  const router = useRouter();
  const { category } = router.query;
  const [categoryProduct] = useState(() => (props.pageFound ? props.data : []));
  if (!props.pageFound) {
    setIsError({
      errorPage: true,
      status: props.status,
      message: props.message,
    });
  }
  const [subCategoryList] = useState(
    data.filter((e) => {
      return e.CategoryName === category;
    })
  );
  return (
    <div className="container">
      <Head>
        <title>Apna Shop | {category}</title>
      </Head>
      <h4 className="mt-4">{category}</h4>
      <div className="row">
        {subCategoryList.map((e) => {
          return e.SubCategory.map((f) => {
            return (
              <div className="col-lg-2 col-md-4 col-sm-6 col-6" key={f}>
                <button
                  className="btn rounded shadow my-2 container btn-warning btn-lg"
                  onClick={() => {
                    Router.push(`/${e.CategoryName}/${f}`);
                  }}
                >
                  {f}
                </button>
              </div>
            );
          });
        })}
      </div>
      <h5 className="mt-4">Total Result - {categoryProduct.length}</h5>
      <div className="row">
        {categoryProduct.map((e) => {
          return <ProductCard e={e} key={e._id} />;
        })}
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/${context.query.category}`
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

export default index;
