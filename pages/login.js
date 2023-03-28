import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Router from "next/router";
import Head from "next/head";
import {
  TextInput,
  PasswordInput,
  Paper,
  Button,
  Title,
  Stack,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import axios from "axios";
import Cookies from "js-cookie";
import Context from "../components/Context";

function Login() {
  const { isLogin, setIsLogin, setIsAlert } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email_address: "",
      password: "",
    },
    validate: {
      email_address: isEmail("Invalid Email address"),
      password: hasLength(
        { min: 6, max: 12 },
        "Password must be at least 6 characters long"
      ),
    },
  });

  useEffect(() => {
    if (isLogin) {
      Router.back();
    }
  }, [isLogin]);

  return (
    <div className="d-flex align-items-center justify-content-center w-100">
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
        <title>Apna Shop | Login</title>
      </Head>
      <Paper
        radius="md"
        my="auto"
        p="xl"
        withBorder
        sx={{
          width: "100%",
          maxWidth: "27rem",
          marginInline: "1rem",
        }}
      >
        <Title align="center" mb={20} weight={500}>
          Login
        </Title>
        <form
          onSubmit={form.onSubmit(async (val) => {
            setLoading(true);
            try {
              const { data } = await axios.post("/api/user", val);
              Cookies.set("user_id", data);
              form.reset();
              setIsLogin(true);
              Router.back();
              setLoading(false);
            } catch (error) {
              setLoading(false);
              if (error.response.data.email_address)
                return form.setFieldError(
                  "email_address",
                  error.response.data.email_address
                );
              if (error.response.data.password)
                return form.setFieldError(
                  "password",
                  error.response.data.password
                );
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
          })}
        >
          <Stack>
            <TextInput
              placeholder="Email address"
              label="Email address"
              {...form.getInputProps("email_address")}
              withAsterisk
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              autoComplete="off"
              {...form.getInputProps("password")}
              withAsterisk
            />
          </Stack>
          <Button type="submit" radius="md" fullWidth color="cyan" mt={10}>
            Login
          </Button>
        </form>
        <Title
          sx={{
            fontSize: "14px",
            marginTop: "8px",
            fontWeight: 400,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Don&#39;t have an account?
          <Link href="/register">
            <Text
              c="cyan"
              ml={4}
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Register
            </Text>
          </Link>
        </Title>
      </Paper>
    </div>
  );
}

export default Login;
