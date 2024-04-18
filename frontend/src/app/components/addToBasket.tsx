"use client";
import React from "react";
import { ProductInterface } from "../interfaces/productInterface";
import { Button } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../networkRequests/networkRequests";

const AddToBasket = ({ productId }: ProductInterface) => {
  const [data, setData] = useState([]);

  const addToBasket = async (prodId: number) => {
    console.log(prodId);
    const postData = await postRequest({
      url: "http://localhost:9000/addItemToBasket",
      parameters: prodId,
    });
    setData(postData);
  };

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
