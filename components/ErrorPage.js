import React from "react";
import Head from "next/head";

function ErrorPage({ isError }) {
  return (
    <div
      style={{ minHeight: "77.1vh" }}
      className="d-flex align-items-center justify-content-center "
    >
      <Head>
        <title>Apna Shop | {isError.message}</title>
      </Head>
      <div className="d-flex align-items-center justify-content-center position-relative">
        <h1
          className="position-absolute"
          style={{ fontSize: "10rem", zIndex: -1, opacity: 0.2 }}
        >
          {isError.status}
        </h1>
        <h1>{isError.message}</h1>
      </div>
    </div>
  );
}

export default ErrorPage;
