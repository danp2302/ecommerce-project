"use client";
import React, { useContext } from "react";
import { ProductInterface } from "../interfaces/productInterface";
import { Button } from "@mui/material";
import { useState } from "react";
import { postRequest } from "../networkRequests/networkRequests";
import { ActionFeedbackContext } from "../context/actionFeedbackContext";

const AddToBasket = ({ productId }: ProductInterface) => {
  const [data, setData] = useState([]);
  const { setAlert } = useContext(ActionFeedbackContext);

  const addToBasket = async (prodId: number) => {
    console.log(prodId);
    const postData = await postRequest({
      url: "http://localhost:9000/addItemToBasket",
      parameters: prodId,
    });

    if (postData.success) {
      setAlert({
        open: true,
        message: "Item added to basket successfully!",
        color: "success",
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
