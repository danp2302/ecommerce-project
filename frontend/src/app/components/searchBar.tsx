"use client";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useContext } from "react";
import { ActionFeedbackContext } from "../context/actionFeedbackContext";
import { getRequestWithParameters } from "../networkRequests/networkRequests";
import { SearchContext } from "../context/searchContext";
import { ProductContext } from "../context/productsContext";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { setAlert } = useContext(ActionFeedbackContext);
  const { products } = useContext(ProductContext);
  const { setSearchResults, setSearchSuccessful } = useContext(SearchContext);

  const callSearch = async () => {
    const searchRequest = await getRequestWithParameters({
      url: `http://localhost:9000/searchForProduct`,
      parameters: searchQuery,
    });

    if (searchRequest?.success) {
      setSearchResults(searchRequest?.data);
      setSearchSuccessful(true);
    } else {
      setAlert({
        open: true,
        message: searchRequest?.message,
        color: "error",
        autoHideDuration: 3000,
      });
      setSearchSuccessful(false);
    }
  };

  const handleSearch = (searchString: string) => {
    setSearchQuery(searchString);
  };
  const handleSearchClick = () => {
    callSearch();
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        onChange={(event) => handleSearch(event.target.value)}
      ></TextField>

      <IconButton onClick={() => handleSearchClick()}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
