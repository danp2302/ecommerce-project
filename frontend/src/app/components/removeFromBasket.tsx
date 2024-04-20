"use client";
import React, { useContext } from "react";
import { ProductInterface } from "../interfaces/productInterface";
import { Button } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../networkRequests/networkRequests";
import { ActionFeedbackContext } from "../context/actionFeedbackContext";

const RemoveFromBasket = ({ productId }: ProductInterface) => {
  const { setAlert } = useContext(ActionFeedbackContext);

  const removeFromBasket = async (prodId: number) => {
    console.log(prodId);
    const postData = await postRequest({
      url: "http://localhost:9000/removeItemFromBasket",
      parameters: prodId,
    });

    if (postData.success) {
      setAlert({
        open: true,
        message: "Item removed from basket successfully!",
        color: "success",
        autoHideDuration: 3000,
      });
    }
  };

  return (
    <Button
      size="small"
      variant="contained"
      onClick={() => removeFromBasket(productId)}
    >
      Remove From Basket
    </Button>
  );
};

export default RemoveFromBasket;
