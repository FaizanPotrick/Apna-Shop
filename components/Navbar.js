import React, { useState, useContext, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import Context from "../components/Context";
import {
  Header,
  Group,
  Button,
  TextInput,
  ActionIcon,
  Title,
  Anchor,
} from "@mantine/core";
import { IconSearch, IconShoppingCart } from "@tabler/icons-react";

function Navbar() {
  const { isLogin, setIsLogin } = useContext(Context);
  const { searching } = useRouter().query;
  const [search, setSearch] = useState(searching || "");
  const [ButtonsLogin, setButtonsLogin] = useState(false);

  useEffect(() => {
    if (isLogin) return setButtonsLogin(true);
  }, [isLogin]);

  return (
    <Header
      sx={{
        borderBottom: 0,
        width: "100%",
        marginBlock: "1rem",
      }}
    >
      <Group
        position="apart"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Anchor
          className="d-flex justify-content-center align-items-center"
          onClick={() => Router.push("/")}
          sx={{
            cursor: "pointer",
            ":hover": {
              textDecoration: "none",
            },
          }}
        >
          <ActionIcon c="cyan" size={50}>
            <IconShoppingCart size="100" stroke={1.5} />
          </ActionIcon>
          <Title order={2} c="dark">
            Apna Shop
          </Title>
        </Anchor>
        <form
          style={{
            width: "100%",
            maxWidth: "500px",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            Router.push(`/search?searching=${search}`);
          }}
        >
          <TextInput
            placeholder="Search"
            icon={<IconSearch size="1rem" stroke={1.5} type="submit" />}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            sx={{
              maxWidth: "500px",
              width: "100%",
            }}
            required
          />
        </form>
        {ButtonsLogin ? (
          <Group>
            <Button color="cyan" onClick={() => Router.push("/orders")}>
              Orders
            </Button>
            <Button color="cyan" onClick={() => Router.push("/cart")}>
              Cart
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setIsLogin(false);
                setButtonsLogin(false);
                Cookies.remove("user_id");
              }}
            >
              Log out
            </Button>
          </Group>
        ) : (
          <Group>
            <Button variant="default" onClick={() => Router.push("/login")}>
              Log in
            </Button>

            <Button color="cyan" onClick={() => Router.push("/register")}>
              Sign up
            </Button>
          </Group>
        )}
      </Group>
    </Header>
  );
}

export default Navbar;
