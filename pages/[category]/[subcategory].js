import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";
import Head from "next/head";
import { LoadingOverlay, Container, Title } from "@mantine/core";
import axios from "axios";

function Index() {
  const { category, subcategory } = useRouter().query;
  const [loading, setLoading] = useState(false);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: Data } = await axios.get(`/api/${category}/${subcategory}`);
      setProducts(Data);
      setLoading(false);
    })();
  }, [subcategory]);

  return (
    <Container size="xl">
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
        <title>Apna Shop | {subcategory}</title>
      </Head>
      <Title className="mt-4 mb-3 text-capitalize">
        {category} | {subcategory}
      </Title>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "start",
          gap: "1rem",
        }}
      >
        {Products.map((e) => {
          return <ProductCard e={e} key={e._id} />;
        })}
      </div>
    </Container>
  );
}

export default Index;
