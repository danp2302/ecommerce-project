import React from "react";
import { Typography } from "@mui/material";

const Title = () => {
  return (
    <Typography
      variant="h5"
      textAlign="center"
      fontWeight="bold"
      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)", color: "black" }}
    >
      WELCOME TO MY E-COMMERCE STORE
    </Typography>
  );
};

export default Title;
