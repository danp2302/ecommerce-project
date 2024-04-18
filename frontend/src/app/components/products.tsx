"use client";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { getRequest } from "../networkRequests/networkRequests";
import { ProductInterface } from "../interfaces/productInterface";
import AddToBasket from "./addToBasket";
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
  }, []);

  return data?.map((product: ProductInterface) => (
    <div className="flex gap-16">
      <Card>
        <CardContent>
          <Typography>{product?.productName}</Typography>
          <Typography>{product?.productDescription}</Typography>
          <Typography>{product?.productInStock}</Typography>
          <Typography>{product?.productPrice}</Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="150"
          src={`data:image/jpeg;base64,${product.productImage}`}
        ></CardMedia>
        <CardActions>
          <AddToBasket productId={product.productId} />
          <Button size="small" variant="contained">
            Remove From Basket
          </Button>
        </CardActions>
      </Card>
    </div>
  ));
};

export default Products;
