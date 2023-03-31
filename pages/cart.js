import React, { useState, useEffect, useContext } from "react";
import Router from "next/router";
import Context from "../components/Context";
import {
  LoadingOverlay,
  Container,
  Button,
  Title,
  Card,
  Image,
  Text,
  NumberInput,
} from "@mantine/core";
import Head from "next/head";
import axios from "axios";

function Cart() {
  const { setIsAlert, isLogin } = useContext(Context);
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
      const { data: Data } = await axios.get("/api/cart");
      setProps(Data);
      setLoading(false);
    })();
  }, []);

  const UpdateQuantity = async (product_id, quantity) => {
    try {
      await axios.put("/api/cart", {
        product_id: product_id,
        quantity: quantity,
      });
      Router.reload();
    } catch (error) {
      if (error.response.data)
        return setIsAlert({
          alert: true,
          message: error.response.data,
        });
      setIsAlert({
        alert: true,
        message: error.message,
      });
    }
  };

  const RemoveProduct = async (product_id) => {
    try {
      await axios.delete(`/api/cart?product_id=${product_id}`);
      Router.reload();
    } catch (error) {
      if (error.response.data)
        return setIsAlert({
          alert: true,
          message: error.response.data,
        });
      setIsAlert({
        alert: true,
        message: error.message,
      });
    }
  };

  let subTotalPrice = 0;
  props.map((e) => {
    subTotalPrice =
      subTotalPrice +
      e.quantity *
        (e.product.price - e.product.price * (e.product.discount / 100));
  });

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
        <title>Apna Shop | My Cart</title>
      </Head>
      {props.length !== 0 && (
        <Title className="mt-4 mb-2 text-capitalize">My Cart</Title>
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
              <Text weight={500}>
                {e.product.product_name.length > 30
                  ? `${e.product.product_name.substring(0, 30)}...`
                  : e.product.product_name}
              </Text>
              <div className="d-flex justify-content-between align-items-end">
                <NumberInput
                  defaultValue={e.quantity}
                  placeholder="Quantity"
                  label="Quantity"
                  w={60}
                  onChange={(value) => UpdateQuantity(e.product._id, value)}
                />
                <Text fw={700} size={25}>
                  ₹
                  {e.product.price -
                    e.product.price * (e.product.discount / 100)}
                </Text>
              </div>
              <Button
                variant="light"
                color="cyan"
                fullWidth
                mt={10}
                radius="md"
                onClick={() => RemoveProduct(e.product._id)}
              >
                Remove from Cart
              </Button>
            </Card>
          );
        })}
      </div>
      {props.length !== 0 && (
        <div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-3">
            <Title size={20}>
              Subtotal({props.length} items): ₹{subTotalPrice}
            </Title>
            <Button
              color="cyan"
              onClick={async () => {
                setLoading(true);
                try {
                  await axios.post("/api/order");
                  Router.push("/orders");
                } catch (error) {
                  if (error.response.data)
                    return setIsAlert({
                      alert: true,
                      message: error.response.data,
                    });
                  setIsAlert({
                    alert: true,
                    message: error.message,
                  });
                }
                setLoading(false);
              }}
            >
              Purchase
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Cart;
