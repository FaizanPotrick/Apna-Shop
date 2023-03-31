import React, { useEffect } from "react";
import { Alert as AlertCard } from "@mantine/core";

function Alert({ alert, message, setIsAlert }) {
  useEffect(() => {
    if (!alert) return;
    setTimeout(() => {
      setIsAlert({
        alert: false,
        message: "",
      });
    }, 3000);
  }, [alert]);

  return (
    <AlertCard
      color="cyan"
      radius="md"
      variant="filled"
      className="shadow"
      sx={{
        position: "fixed",
        top: "8.5vh",
        left: "46.5%",
        zIndex: 50,
      }}
    >
      {message}
    </AlertCard>
  );
}

export default Alert;
