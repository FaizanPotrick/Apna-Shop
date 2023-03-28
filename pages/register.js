import React, { useState } from "react";
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

function Register() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      email_address: "",
      phone_number: "",
      address: {
        street: "",
        landMark: "",
        city: "",
        district: "",
        state: "",
        country: "",
        pinCode: "",
      },
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
      address: {
        street: hasLength(
          { min: 3 },
          "Street must be at least 3 characters long"
        ),
        landMark: hasLength(
          { min: 3 },
          "Landmark must be at least 3 characters long"
        ),
        city: hasLength({ min: 3 }, "City must be at least 3 characters long"),
        district: hasLength(
          { min: 3 },
          "District must be at least 3 characters long"
        ),
        state: hasLength(
          { min: 3 },
          "State must be at least 3 characters long"
        ),
        country: hasLength(
          { min: 3 },
          "Country must be at least 3 characters long"
        ),
        pinCode: hasLength({ min: 6 }, "Pin Code must be 6 digits"),
      },
      password: hasLength(
        { min: 6, max: 12 },
        "Password must be at least 6 characters long"
      ),
      cPassword: (value, { values }) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

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
              await axios.put("/api/user", val);
              form.reset();
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
              if (error.response.data) return alert(error.response.data);
              console.log(error);
              alert(error);
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
              placeholder="Street"
              label="Street"
              {...form.getInputProps("address.street")}
              withAsterisk
            />
            <TextInput
              placeholder="Landmark"
              label="Landmark"
              {...form.getInputProps("address.landMark")}
              withAsterisk
            />
            <TextInput
              placeholder="City"
              label="City"
              {...form.getInputProps("address.city")}
              withAsterisk
            />
            <TextInput
              placeholder="District"
              label="District"
              {...form.getInputProps("address.district")}
              withAsterisk
            />
            <TextInput
              placeholder="State"
              label="State"
              {...form.getInputProps("address.state")}
              withAsterisk
            />
            <TextInput
              placeholder="Country"
              label="Country"
              {...form.getInputProps("address.country")}
              withAsterisk
            />
            <TextInput
              placeholder="Pin Code"
              label="Pin Code"
              {...form.getInputProps("address.pinCode")}
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
