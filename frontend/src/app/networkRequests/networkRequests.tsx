import { useState, useEffect } from "react";
import { RequestInterface } from "../interfaces/requestInterface";

class NetworkRequests {
  getRequest = async ({ url }: RequestInterface) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      if (responseData.success) {
        return responseData.data;
      } else {
        throw new Error("Response data was not successful");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
}

export default NetworkRequests;
