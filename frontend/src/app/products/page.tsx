import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/card";
import { Button } from "@/app/components/button";
import { getRequest } from "../networkRequests/networkRequests";
import { ProductContext } from "../context/productsContext";
import AddToBasket from "../components/addToBasket";
import RemoveFromBasket from "../components/removeFromBasket";
import React from "react";
import { Typography } from "@mui/material";

export default async function Products() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  console.log("producrs new", products);
  return (
    <>
      {products?.data?.map((product: any) => {
        return (
          <div className="flex gap-16 items-start" key={product?.productId}>
            <Card>
              <CardHeader>
                <CardTitle>{product?.name}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap -mx-2">
                    <div className="w-full md:w-1/2 px-2 mb-4">
                      Stock: {product?.stock}
                    </div>

                    <div className="w-full md:w-1/2 px-2 mb-4">
                      Price: £{product?.price}
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>{product?.description}</CardContent>
              <CardFooter>
                <Button>Add To Basket</Button>
                <Button>Remove From Basket</Button>
              </CardFooter>
            </Card>
          </div>
        );
      })}
    </>
    // <>
    //   {
    //     products?.map((product) => (
    //       <div className="flex gap-16 items-start" key={product?.productId}>
    //         <Card variant="outlined">
    //           <CardContent>
    //             <Typography
    //               sx={{ fontSize: 22 }}
    //               color="text.primary"
    //               gutterBottom
    //             >
    //               {product?.productName}
    //             </Typography>
    //             <Typography sx={{ fontSize: 16 }} color="text.secondary">
    //               {product?.productDescription}
    //             </Typography>
    //             <br />
    //             <div className="flex flex-wrap -mx-2">
    //               <div className="w-full md:w-1/2 px-2 mb-4">
    //                 <Typography sx={{ fontSize: 14 }}>
    //                   Available Stock: {product?.productInStock}
    //                 </Typography>
    //               </div>
    //               <div className="w-full md:w-1/2 px-2 mb-4">
    //                 <Typography sx={{ fontSize: 14 }}>
    //                   Price: £{product?.productPrice}
    //                 </Typography>
    //               </div>
    //             </div>
    //           </CardContent>
    //           <CardMedia
    //             component="img"
    //             height="150"
    //             src={`data:image/jpeg;base64,${product?.productImage}`}
    //           />
    //           <CardActions>
    //             <AddToBasket productId={product?.productId} />
    //             <RemoveFromBasket productId={product?.productId} />
    //           </CardActions>
    //         </Card>
    //       </div>
    //     ))
    // : searchResults.map((product) => (
    //     <div className="flex gap-16 items-start" key={product?.productId}>
    //       <Card variant="outlined">
    //         <CardContent>
    //           <Typography
    //             sx={{ fontSize: 22 }}
    //             color="text.primary"
    //             gutterBottom
    //           >
    //             {product?.productName}
    //           </Typography>
    //           <Typography sx={{ fontSize: 16 }} color="text.secondary">
    //             {product?.productDescription}
    //           </Typography>
    //           <br />
    //           <div className="flex flex-wrap -mx-2">
    //             <div className="w-full md:w-1/2 px-2 mb-4">
    //               <Typography sx={{ fontSize: 14 }}>
    //                 Available Stock: {product?.productInStock}
    //               </Typography>
    //             </div>
    //             <div className="w-full md:w-1/2 px-2 mb-4">
    //               <Typography sx={{ fontSize: 14 }}>
    //                 Price: £{product?.productPrice}
    //               </Typography>
    //             </div>
    //           </div>
    //         </CardContent>
    //         <CardMedia
    //           component="img"
    //           height="150"
    //           src={`data:image/jpeg;base64,${product?.productImage}`}
    //         />
    //         <CardActions>
    //           <AddToBasket productId={product?.productId} />
    //           <RemoveFromBasket productId={product?.productId} />
    //         </CardActions>
    //       </Card>
    //     </div>
    //   ))}
    //   }
    // </>
  );
}
