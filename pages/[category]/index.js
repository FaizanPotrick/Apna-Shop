import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import ProductCard from "../../components/ProductCard";
import Context from "../../components/Context";
import { LoadingOverlay, Container, Button, Group, Title } from "@mantine/core";
import Head from "next/head";
import axios from "axios";

function Index() {
  const [props, setProps] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data } = useContext(Context);
  const { category } = useRouter().query;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: Data } = await axios.get(`/api/${category}`);
      setProps(Data);
      setLoading(false);
    })();
  }, [category]);

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
        <title>Apna Shop | {category}</title>
      </Head>
      <Title className="mt-4 mb-2 text-capitalize">{category}</Title>
      <Group className="mb-4" grow>
        {data.map((e) => {
          if (e.CategoryName === category) {
            return e.SubCategory.map((sub) => {
              return (
                <Button
                  color="cyan"
                  component="a"
                  href={`/${category}/${sub}`}
                  size="lg"
                  className="text-capitalize"
                >
                  {sub}
                </Button>
              );
            });
          }
        })}
      </Group>
      <div className="row">
        {props.map((e) => {
          return <ProductCard e={e} key={e._id} />;
        })}
      </div>
    </Container>
  );
}

export default Index;
