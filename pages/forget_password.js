import React, { useState } from "react";
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
} from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import axios from "axios";

function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email_address: "",
      phone_number: "",
      password: "",
      cPassword: "",
    },
    validate: {
      email_address: isEmail("Invalid Email address"),
      phone_number: hasLength(
        { min: 10, max: 10 },
        "Phone number must be 10 digits long"
      ),
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
        <title>Apna Shop | Forget Password</title>
      </Head>
      <Paper
        radius="md"
        my="auto"
        p="xl"
        withBorder
        sx={{
          width: "100%",
          maxWidth: "37rem",
          marginInline: "1rem",
        }}
      >
        <Title align="center" mb={20} weight={500}>
          Forget Password
        </Title>
        <form
          onSubmit={form.onSubmit(async (val) => {
            setLoading(true);
            try {
              await axios.delete("/api/user", val);
              form.reset();
              Router.push("/login");
              setLoading(false);
            } catch (error) {
              setLoading(false);
              if (error.response.data.email_address)
                return form.setFieldError(
                  "email_address",
                  error.response.data.email_address
                );
              if (error.response.data.phone_number)
                return form.setFieldError(
                  "phone_number",
                  error.response.data.phone_number
                );
              if (error.response.data.cPassword)
                return form.setFieldError(
                  "cPassword",
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
              placeholder="Email address"
              label="Email address"
              {...form.getInputProps("email_address")}
              withAsterisk
            />
            <TextInput
              placeholder="Phone number"
              label="Phone number"
              {...form.getInputProps("phone_number")}
              withAsterisk
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              autoComplete="off"
              {...form.getInputProps("password")}
              withAsterisk
            />
            <PasswordInput
              placeholder="Confirm Password"
              label="Confirm Password"
              autoComplete="off"
              {...form.getInputProps("cPassword")}
              withAsterisk
            />
          </Stack>
          <Button type="submit" radius="md" fullWidth color="cyan" mt={20}>
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default ForgetPassword;
