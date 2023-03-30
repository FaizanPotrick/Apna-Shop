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

function Register() {
  const { isLogin, setIsLogin, setIsAlert } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      email_address: "",
      phone_number: "",
      address: "",
      password: "",
      cPassword: "",
    },
    validate: {
      name: hasLength({ min: 3 }, "Name must be at least 3 characters long"),
      email_address: isEmail("Invalid Email address"),
      phone_number: hasLength(
        { min: 10, max: 10 },
        "Phone number must be 10 digits"
      ),
      address: hasLength(
        { min: 3 },
        "Address must be at least 3 characters long"
      ),
      password: hasLength(
        { min: 6, max: 12 },
        "Password must be at least 6 characters long"
      ),
      cPassword: hasLength(
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
        <title>Apna Shop | Register</title>
      </Head>
      <Paper
        radius="md"
        my="auto"
        p="xl"
        withBorder
        sx={{
          width: "100%",
          maxWidth: "40rem",
          marginInline: "1rem",
        }}
      >
        <Title align="center" mb={20} weight={500}>
          Create Account
        </Title>
        <form
          onSubmit={form.onSubmit(async (val) => {
            setLoading(true);
            try {
              const { data } = await axios.put("/api/user", val);
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
              if (error.response.data.cPassword)
                return form.setFieldError(
                  "password",
                  error.response.data.cPassword
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
          <Stack
            sx={(theme) => ({
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              [theme.fn.smallerThan("xs")]: {
                gridTemplateColumns: "1fr",
              },
            })}
          >
            <TextInput
              placeholder="Name"
              label="Name"
              {...form.getInputProps("name")}
              withAsterisk
            />
            <TextInput
              placeholder="Email address"
              label="Email address"
              {...form.getInputProps("email_address")}
              withAsterisk
            />
            <TextInput
              placeholder="Phone Number"
              label="Phone Number"
              {...form.getInputProps("phone_number")}
              withAsterisk
            />
            <TextInput
              placeholder="Address"
              label="Address"
              {...form.getInputProps("address")}
              withAsterisk
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              {...form.getInputProps("password")}
              withAsterisk
              autoComplete="off"
            />
            <PasswordInput
              placeholder="Confirm Password"
              label="Confirm Password"
              {...form.getInputProps("cPassword")}
              withAsterisk
              autoComplete="off"
            />
          </Stack>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></div>
          <Button type="submit" radius="md" fullWidth color="cyan" mt={20}>
            Register
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
          Have already an account?
          <Link href="/login">
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
              Login
            </Text>
          </Link>
        </Title>
      </Paper>
    </div>
  );
}

export default Register;
