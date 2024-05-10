"use client";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { ReactNode } from "react";
import { ProductInterface } from "../interfaces/productInterface";

interface Product {
  products: ProductInterface[];
  setProducts: Dispatch<SetStateAction<ProductInterface[]>>;
}

interface Props {
  children: ReactNode;
}

const ProductContext = createContext<Product>({
  products: [],
  setProducts: () => {},
});

const ProductProvider = ({ children }: Props) => {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
