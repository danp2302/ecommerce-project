import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Badge } from "@mui/material";

const ItemsInBasket = () => {
  return (
    <div style={{ position: "relative" }}>
      <Badge
        badgeContent={4}
        color="primary"
        overlap="circular"
        sx={{ "& .MuiBadge-badge": { fontSize: 25, height: 30, minWidth: 30 } }}
      >
        <ShoppingBasketIcon color="action" sx={{ fontSize: 100 }} />
      </Badge>
    </div>
  );
};

export default ItemsInBasket;
