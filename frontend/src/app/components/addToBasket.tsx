"use client";
import React, { useContext } from "react";
import { ProductInterface } from "../interfaces/productInterface";
import { Button } from "@mui/material";
import { postRequest } from "../networkRequests/networkRequests";
import { ActionFeedbackContext } from "../context/actionFeedbackContext";

const AddToBasket = ({ productId }: ProductInterface) => {
  const { setAlert } = useContext(ActionFeedbackContext);

  const addToBasket = async (prodId: number) => {
    const postData = await postRequest({
      url: "http://localhost:9000/addItemToBasket",
      parameters: prodId,
    });

    if (postData?.success) {
      setAlert({
        open: true,
        message: postData?.message,
        color: "success",
        autoHideDuration: 3000,
      });
    } else {
      setAlert({
        open: true,
        message: postData?.message,
        color: "error",
        autoHideDuration: 3000,
      });
    }
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
