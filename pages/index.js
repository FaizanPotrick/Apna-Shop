import React, { useState, useEffect } from "react";
import { useContext } from "react";
import Context from "../components/Context";
import ProductCard from "../components/ProductCard";
import Head from "next/head";
import {
  createStyles,
  Paper,
  Button,
  useMantineTheme,
  rem,
  Group,
  LoadingOverlay,
  Title,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import Router from "next/router";

const useStyles = createStyles(() => ({
  card: {
    height: rem(440),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

export default function Home() {
  const theme = useMantineTheme();
  const { data } = useContext(Context);
  const { classes } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [loading, setLoading] = useState(false);
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: Data } = await axios.get("/api/landing");
      setProducts(Data);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
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
        <title>Apna Shop </title>
      </Head>
      <Carousel
        slideSize="50%"
        breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: rem(2) }]}
        slideGap="xl"
        align="start"
        slidesToScroll={mobile ? 1 : 2}
      >
        {["electronic.jpg", "clothes.jpg", "grocery.jpg", "jwellery.jpg"].map(
          (item, index) => (
            <Carousel.Slide key={index}>
              <Paper
                shadow="md"
                p="xl"
                radius="md"
                sx={{ backgroundImage: `url(${item})` }}
                className={classes.card}
              />
            </Carousel.Slide>
          )
        )}
      </Carousel>
      <Group grow className="my-3">
        {data.map(({ CategoryImage, CategoryName }, index) => {
          return (
            <Button
              className="shadow text-capitalize"
              key={index}
              size="xl"
              radius="md"
              sx={{
                textShadow:
                  "-2px 0 black, 0 2px black, 2px 0 black, 0 -1px black",
                backgroundImage: `url(${CategoryImage})`,
                backgroundSize: "cover",
                border: "none",
              }}
              onClick={() => {
                Router.push(`/${CategoryName}`);
              }}
            >
              {CategoryName}
            </Button>
          );
        })}
      </Group>
      {Products.length !== 0 && <Title order={2} fw={500} className="mt-5 mb-2">
        Recommended Products
      </Title>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {Products.map((e) => {
          return <ProductCard e={e} key={e._id} />;
        })}
      </div>
    </div>
  );
}
