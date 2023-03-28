import React, { useState } from "react";
import "../styles/globals.css";
import Context from "../components/Context";
import Alert from "../components/Alert";
import Navbar from "../components/Navbar";
import Head from "next/head";
import ErrorPage from "../components/ErrorPage";
import Script from "next/script";
import { MantineProvider, Text } from "@mantine/core";

function MyApp({ Component, pageProps }) {
  const [isAlert, setIsAlert] = useState({
    alert: false,
    message: "",
  });
  const [isError, setIsError] = useState({
    errorPage: false,
    status: "",
    message: "",
  });
  const data = [
    {
      CategoryName: "Grocery",
      SubCategory: ["Pulse", "Fruits", "Snacks", "Vegetables"],
      CategoryImage: "groceries.webp",
    },
    {
      CategoryName: "Mobile",
      SubCategory: ["Samsung", "OPPO", "Apple", "Redmi", "Huawei"],
      CategoryImage: "mobiles.jpg",
    },
    {
      CategoryName: "Fashion",
      SubCategory: ["Men", "Women"],
      CategoryImage: "fashion.jpg",
    },
    {
      CategoryName: "Electronic",
      SubCategory: [
        "Monitor",
        "Mouse",
        "Keyboard",
        "Laptop",
        "Airpod",
        "Headphone",
        "Earphone",
        "Bluetooth Speaker",
        "PC",
      ],
      CategoryImage: "electronics.jpg",
    },
    {
      CategoryName: "Accessories",
      SubCategory: ["Jewelry", "Watch", "Shoes"],
      CategoryImage: "home.png",
    },
    {
      CategoryName: "Appliances",
      SubCategory: [
        "Refrigerator",
        "Washing Machine",
        "Gas Stove",
        "Exhaust Fan",
        "Fan",
        "AC",
        "Mixer grinder",
        "Heater",
        "Vaccum Cleaner",
        "TV",
      ],
      CategoryImage: "appliances.jpg",
    },
  ];
  const images = [
    "electronic.jpg",
    "clothes.jpg",
    "grocery.jpg",
    "jwellery.jpg",
  ];
  return (
    <Context.Provider
      value={{
        isAlert,
        setIsAlert,
        setIsError,
        data,
        images,
      }}
    >
      <MantineProvider>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
        ></link>
        <Head>
          <meta name="description" content="Generated by create next app" />
        </Head>
        <div
          className="d-flex justify-content-between align-items-center flex-column"
          style={{
            minHeight: "100vh",
          }}
        >
          <Navbar />
          {isError.errorPage && <ErrorPage isError={isError} />}
          {!isError.errorPage && <Component {...pageProps} />}
          <footer
            className="text-center"
            style={{
              marginBlock: "1rem",
            }}
          >
            <Text color="dimmed" size="sm">
              © 2022 Apna Shop. All rights reserved.
            </Text>
          </footer>
        </div>
        {isAlert.alert && (
          <Alert
            alert={isAlert.alert}
            message={isAlert.message}
            setIsAlert={setIsAlert}
          />
        )}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></Script>
      </MantineProvider>
    </Context.Provider>
  );
}

export default MyApp;
