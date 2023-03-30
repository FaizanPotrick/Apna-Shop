import React, { useState, useContext } from "react";
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
  const router = useRouter();
  const { searching } = router.query;
  const [search, setSearch] = useState(searching);

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
        >
          <TextInput
            placeholder="Search"
            icon={
              <IconSearch
                size="1rem"
                stroke={1.5}
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  await Router.push(`/search?searching=${search}`);
                  Router.reload();
                }}
              />
            }
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            sx={{
              maxWidth: "500px",
              width: "100%",
            }}
            required
          />
        </form>
          <Group>
            {isLogin && <Button color="cyan" component="a" href="/orders">
              Orders
            </Button>}
            {isLogin && <Button color="cyan" component="a" href="/cart">
              Cart
            </Button>}
            {isLogin && <Button
              variant="default"
              onClick={() => {
                setIsLogin(false);
                Cookies.remove("user_id");
              }}
            >
              Log out
            </Button>}
            {!isLogin && <Button variant="default" component="a" href="/login">
              Log in
            </Button>}
            {!isLogin && <Button color="cyan" component="a" href="/register">
              Sign up
            </Button>}
          </Group>
      </Group>
    </Header>
  );
}

export default Navbar;
