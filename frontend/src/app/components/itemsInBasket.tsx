"use client";
import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Badge } from "@mui/material";
import { useState, useEffect } from "react";
import { getRequest } from "../networkRequests/networkRequests";

const ItemsInBasket = () => {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchBasketItems = async () => {
      const fetchedBasketItems = await getRequest({
        url: "http://localhost:9000/numberOfItemsInBasket",
      });
      const fetchedDataJSON = JSON.parse(fetchedBasketItems);
      if (fetchedDataJSON?.success) {
        setTotalItems(fetchedDataJSON?.data);
      }
    };

    fetchBasketItems();
    setInterval(fetchBasketItems, 1000);
  }, []);
  return (
    <div className="relative">
      <Badge
        badgeContent={totalItems}
        color="primary"
        overlap="circular"
        sx={{ "& .MuiBadge-badge": { fontSize: 20, height: 25, minWidth: 30 } }}
      >
        <ShoppingBasketIcon color="action" sx={{ fontSize: 60 }} />
      </Badge>
    </div>
  );
};

export default ItemsInBasket;
