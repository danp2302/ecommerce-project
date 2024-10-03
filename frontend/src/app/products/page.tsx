import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardImage,
} from "@/app/components/card";
import { Button } from "@/app/components/button";
import React from "react";
import styles from "@/app/products/styles.module.css";

export default async function Products() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();

  return (
    <>
      {products?.data?.map((product: any) => {
        return (
          <div className={styles.mainCard} key={product?.productId}>
            <Card>
              <CardImage
                href={product?.image}
                alt={product?.name}
                height={150}
              />
              <CardHeader>
                <CardTitle>{product?.name}</CardTitle>
                <CardDescription>
                  <div className={styles.descriptionDivStyling1}>
                    <div className={styles.descriptionDivStyling2}>
                      <strong>Stock: {product?.stock}</strong>
                    </div>

                    <div className="w-full md:w-1/2 px-2 mb-4">
                      <strong>Price: £{product?.price}</strong>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>{product?.description}</CardContent>
              <div className={styles.descriptionDivStyling1}>
                <div className={styles.descriptionDivStyling2}>
                  <Button className={styles.addButton}>Add To Basket</Button>
                </div>
                <div className={styles.descriptionDivStyling2}>
                  <Button className={styles.removeButton}>
                    Remove From Basket
                  </Button>
                </div>
              </div>
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
