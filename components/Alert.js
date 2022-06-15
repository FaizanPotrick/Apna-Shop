import React, { useEffect } from "react";

function Alert({ alert, message, setIsAlert }) {
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setIsAlert({
          alert: false,
          message: "",
        });
      }, 3000);
    }
  }, [alert]);
  return (
    <div
      className={`p-3 rounded shadow`}
      style={{
        position: "fixed",
        top: "8.5vh",
        left: "45%",
        zIndex: 50,
        backgroundColor: "ButtonHighlight",
      }}
    >
      {message}
    </div>
  );
}

export default Alert;
