import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductCard from "../components/ProductCard";
import Head from "next/head";
import axios from "axios";
import { LoadingOverlay, Container, Title, Text } from "@mantine/core";

function Search() {
  const { searching } = useRouter().query;
  const [loading, setLoading] = useState(false);
  const [props, setProps] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: Data } = await axios.get(
        `/api/search?searching=${searching}`
      );
      setProps(Data);
      setLoading(false);
    })();
  }, [searching]);

  return (
    <Container size="xl"  sx={{
      width: "100%",
    }}>
      <LoadingOverlay
        visible={loading}
        overlayBlur={1}
        loaderProps={{
          size: 40,
          color: "cyan",
          variant: "bars",
        }}
      />
      <Head>
        <title>Apna Shop | {searching}</title>
      </Head>
      {props.length !== 0 && (
        <Title className="mt-4 mb-2 text-capitalize">
          Search - {searching}
        </Title>
      )}
      {props.length === 0 && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            flexDirection: "column",
          }}
        >
          <Title className="mt-4">OOPS!</Title>
          <Text className="mb-2 text-capitalize">
            No Results about <b>{searching}</b>
          </Text>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {props.length !== 0 &&
          props.map((e) => {
            return <ProductCard e={e} key={e._id} />;
          })}
      </div>
    </Container>
  );
}

export default Search;
