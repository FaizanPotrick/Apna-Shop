import React, { useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../../components/ProductCard";
import { useContext } from "react";
import Context from "../../../components/Context";
import Head from "next/head";

function index(props) {
  const router = useRouter();
  const context = useContext(Context);
  const { setIsError } = context;
  const { category, subcategory } = router.query;
  const [subCategoryProduct] = useState(() =>
    props.pageFound ? props.data : []
  );
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
        <title>Apna Shop | {subcategory}</title>
      </Head>
      <h4 className="mt-4">
        <a className="text-dark" href={`/${category}`}>
          {category}
        </a>
        /{subcategory}
      </h4>
      <h5 className="mt-4">Total Result - {subCategoryProduct.length}</h5>

      <div className="row">
        {subCategoryProduct.map((e) => {
          return <ProductCard e={e} key={e._id} />;
        })}
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/${context.query.category}/${context.query.subcategory}`
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
