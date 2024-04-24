"use client";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { getRequest } from "../networkRequests/networkRequests";
import { ProductInterface } from "../interfaces/productInterface";
import AddToBasket from "./addToBasket";
import RemoveFromBasket from "./removeFromBasket";
import { useState, useEffect } from "react";
import React from "react";

const Products = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getRequest({
        url: "http://localhost:9000/getProducts",
      });
      setData(fetchedData);
    };

    fetchData();
    setInterval(fetchData, 1000);
  }, []);

  return data?.map((product: ProductInterface) => (
    <div className="flex gap-16 items-start">
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 22 }} color="text.primary" gutterBottom>
            {product?.productName}
          </Typography>
          <Typography sx={{ fontSize: 16 }} color="text.secondary">
            {product?.productDescription}
          </Typography>
          <br />
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <Typography sx={{ fontSize: 14 }}>
                Available Stock: {product?.productInStock}
              </Typography>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <Typography sx={{ fontSize: 14 }}>
                Price: £{product?.productPrice}
              </Typography>
            </div>
          </div>
        </CardContent>
        <CardMedia
          component="img"
          height="150"
          src={`data:image/jpeg;base64,${product?.productImage}`}
        ></CardMedia>
        <CardActions>
          <AddToBasket productId={product?.productId} />
          <RemoveFromBasket productId={product?.productId} />
        </CardActions>
      </Card>
    </div>
  ));
};

export default Products;
