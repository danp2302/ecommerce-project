import { RequestInterface } from "../interfaces/requestInterface";

const getRequest = async ({ url }: RequestInterface) => {
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

const postRequest = async ({ url, parameters }: RequestInterface) => {
  try {
    const urlWithParams = `${url}/${parameters}`;
    const response = await fetch(urlWithParams, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();

    if (responseData.success) {
      return responseData;
    } else {
      throw new Error("Response data was not successful");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export { getRequest, postRequest };
