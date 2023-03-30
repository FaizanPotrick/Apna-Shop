import React, { useState } from "react";
import Router from "next/router";
import { useContext } from "react";
import Context from "../components/Context";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  NumberInput,
} from "@mantine/core";
import axios from "axios";

function ProductCard({ e }) {
  const { setIsAlert, isLogin } = useContext(Context);
  const [quantity, setQuantity] = useState(1);

  const AddToCart = async (product_id) => {
    try {
      const { data } = await axios.post("/api/cart", {
        product_id: product_id,
        quantity: quantity,
      });
      setIsAlert({
        alert: true,
        message: data,
      });
    } catch (err) {
      if (err.response.data)
        return setIsAlert({
          alert: true,
          message: err.response.data,
        });
      setIsAlert({
        alert: true,
        message: err.message,
      });
    }
  };

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
          src={e.image_url}
          height={200}
          alt="Norway"
          withPlaceholder
          sx={{
            cursor: "pointer",
            backgroundSize: "cover",
          }}
          onClick={() => {
            Router.push(`/${e.category}/${e.subcategory}/${e._id}`);
          }}
        />
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>
          {e.product_name.length > 15
            ? `${e.product_name.substring(0, 15)}...`
            : e.product_name}
        </Text>
        <Badge
          color={
            1 <= e.stock && e.stock <= 10
              ? "yellow"
              : e.stock > 10
              ? "green"
              : "red"
          }
          size="sm"
          variant="light"
        >
          {1 <= e.stock && e.stock <= 10
            ? "Limited Stock"
            : e.stock > 10
            ? "In Stock"
            : "Out of Stock"}
        </Badge>
      </Group>
      <div className="d-flex justify-content-between align-items-end">
        <NumberInput
          defaultValue={quantity}
          placeholder="Quantity"
          label="Quantity"
          w={60}
          onChange={(value) => setQuantity(value)}
        />
        <Text fw={700} size={25}>
          ₹{e.price - e.price * (e.discount / 100)}{" "}
          <del className="text-danger fs-6">₹{e.price}</del>
        </Text>
      </div>
      <Button
        variant="light"
        color="cyan"
        fullWidth
        mt={10}
        radius="md"
        onClick={() => {
          if (isLogin) return AddToCart(e._id);
          Router.push("/login");
        }}
      >
        Add to cart
      </Button>
    </Card>
  );
}

export default ProductCard;
