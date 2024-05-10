"use client";
import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { ReactNode } from "react";
import { ProductInterface } from "../interfaces/productInterface";

interface Search {
  searchResults: ProductInterface[];
  setSearchResults: Dispatch<SetStateAction<ProductInterface[]>>;
  searchSuccessful: boolean;
  setSearchSuccessful: Dispatch<SetStateAction<boolean>>;
}

interface Props {
  children: ReactNode;
}

const SearchContext = createContext<Search>({
  searchResults: [],
  setSearchResults: () => {},
  searchSuccessful: false,
  setSearchSuccessful: () => {},
});

const SearchProvider = ({ children }: Props) => {
  const [searchResults, setSearchResults] = useState<ProductInterface[]>([]);
  const [searchSuccessful, setSearchSuccessful] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        searchResults,
        setSearchResults,
        searchSuccessful,
        setSearchSuccessful,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };
