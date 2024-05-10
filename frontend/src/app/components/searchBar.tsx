"use client";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useContext } from "react";
import { ActionFeedbackContext } from "../context/actionFeedbackContext";
import { getRequestWithParameters } from "../networkRequests/networkRequests";
import { SearchContext } from "../context/searchContext";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { setAlert } = useContext(ActionFeedbackContext);
  const { setSearchResults, setSearchSuccessful } = useContext(SearchContext);

  const callSearch = async () => {
    const searchRequest: string = await getRequestWithParameters({
      url: `http://localhost:9000/searchForProduct`,
      parameters: searchQuery,
    });
    const fetchedDataJSON = JSON.parse(searchRequest);
    if (fetchedDataJSON?.success) {
      setSearchResults(fetchedDataJSON?.data);
      setSearchSuccessful(true);
    } else {
      setAlert({
        open: true,
        message: fetchedDataJSON?.message,
        color: "error",
        autoHideDuration: 3000,
      });
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
