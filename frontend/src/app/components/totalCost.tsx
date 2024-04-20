"use client";
import React from "react";
import { useEffect, useState } from "react";
import { getRequest } from "../networkRequests/networkRequests";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
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
    <div className="inline-flex items-center p-2 rounded-lg border border-gray-300 bg-blue-300">
      <svg
        className="w-6 h-6 text-gray-600 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <CurrencyPoundIcon></CurrencyPoundIcon>
      </svg>
      <span className="text-xl font-medium text-gray-800">{totalCost}</span>
    </div>
  );
};

export default TotalCost;
