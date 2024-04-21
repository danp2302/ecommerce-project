"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getRequest } from "../networkRequests/networkRequests";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import { Typography } from "@mui/material";
const TotalCost = () => {
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchTotalCost = async () => {
      const fetchedTotalCost = await getRequest({
        url: "http://localhost:9000/totalCostOfBasket",
      });
      setTotalCost(fetchedTotalCost);
    };

    fetchTotalCost();
    setInterval(fetchTotalCost, 1000);
  }, []);
  return (
    <div className="flex items-center">
      <svg
        className="w-10 h-10 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <CurrencyPoundIcon />
      </svg>
      <Typography className="text-4xl font-large text-gray-800">
        {totalCost}
      </Typography>
    </div>
  );
};

export default TotalCost;
