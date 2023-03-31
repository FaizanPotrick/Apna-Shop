import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import Context from "../components/Context";
import Head from "next/head";
import Router from "next/router";
import {
  LoadingOverlay,
  Container,
  Title,
  Card,
  Image,
  Text,
} from "@mantine/core";
import axios from "axios";

function Orders() {
  const { isLogin } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [props, setProps] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      Router.push("/");
    }
  }, [isLogin]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data: Data } = await axios.get("/api/order");
      setProps(Data);
      setLoading(false);
    })();
  }, []);

  return (
    <Container
      size="xl"
      sx={{
        width: "100%",
      }}
    >
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
        <title>Apna Shop | Orders</title>
      </Head>
      {props.length !== 0 && (
        <Title className="mt-4 mb-2 text-capitalize">My Orders</Title>
      )}
      {props.length === 0 && (
        <div className="d-flex align-items-center justify-content-center position-relative">
          <Title c="dimmed" fw={500}>
            Empty
          </Title>
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "start",
          gap: "1rem",
        }}
      >
        {props.map((e) => {
          return (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={e._id}
              sx={{
                width: "100%",
                maxWidth: "300px",
              }}
            >
              <Card.Section>
                <Image
                  src={e.product.image_url}
                  height={200}
                  alt="Norway"
                  withPlaceholder
                  sx={{
                    backgroundSize: "cover",
                  }}
                />
              </Card.Section>
              <Text size={12} c="dimmed" mt={4}>
                ORDER # {e.order_id}
              </Text>
              <Text weight={500}>
                {e.product.product_name.length > 30
                  ? `${e.product.product_name.substring(0, 30)}...`
                  : e.product.product_name}
              </Text>
              <div className="d-flex justify-content-between align-items-end">
                <Text>Quantity : {e.quantity}</Text>
                <Text size={20}>₹{e.price}</Text>
              </div>
              <Text size={10}>
                Order Placed : {moment(`${e.createdAt}`).format("DD MMMM YYYY")}
              </Text>
            </Card>
          );
        })}
      </div>
    </Container>
  );
}

export default Orders;
