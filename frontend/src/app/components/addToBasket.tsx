"use client";

import React from "react";
import { ProductInterface } from "../interfaces/productInterface";
import { Button } from "@mui/material";

const AddToBasket = ({ productId }: ProductInterface) => {
  const addToBasket = (productId: number) => {};
  return (
    <Button
      size="small"
      variant="contained"
      onClick={() => addToBasket(productId)}
    >
      Add To Basket
    </Button>
  );
};

export default AddToBasket;
