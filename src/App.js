import React, { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

const makeGifCall = (url, query, successCb, offset = 0) => {
  axios
    .request({
      url,
      method: "GET",
      params: {
        api_key: "P5W09GD0AkqX56pvDYmVZFZliFKI9Lbl",
        limit: 15,
        q: query,
        offset,
      },
    })
    .then(({ data }) => {
      successCb(data.data);
    })
    .catch((error) => {
      console.log("Error fetching and parsing data", error);
    });
};

const App = () => {
  const [isLoading, changeLoadingStatus] = useState(true);
  const [gifs, setGifsData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [query, setQuery] = useState("cats");

  const handleHeaderClick = () => {
    const url = "https://api.giphy.com/v1/gifs/trending";
    const successCb = (data) => {
      setGifsData(data);
      changeLoadingStatus(false);
    };
    makeGifCall(url, "", successCb);
  };

  const performSearch = (offset) => {
    const url = "https://api.giphy.com/v1/gifs/search";
    const successCb = (data) => {
      setGifsData(data);
      changeLoadingStatus(false);
    };
    makeGifCall(url, query, successCb, offset);
  };

  useEffect(() => {
    performSearch();
  }, []);

  const handleNextPage = () => {
    const nextOffset = offset + 10;
    performSearch(nextOffset);
    setOffset(nextOffset);
  };

  const handlePrevPage = () => {
    const prevOffset = offset - 10;

    if (prevOffset < 0) {
      return;
    }

    performSearch(prevOffset);
    setOffset(prevOffset);
  };

  const handleSearch = ({ searchQuery }) => {
    setQuery(searchQuery);
    performSearch();
  };

  return (
    <div>
      <div className="main-header">
        <div className="inner">
          <h1
            style={{ cursor: "pointer" }}
            className="main-title"
            onClick={handleHeaderClick}
          >
            GifSearch
          </h1>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>
      <div className="main-content">
        <div className="button-pagination-container">
          <button className="button-pagination" onClick={handlePrevPage}>
            Previous
          </button>
          <button className="button-pagination" onClick={handleNextPage}>
            Next
          </button>
        </div>
        {isLoading ? <p>Loading...</p> : <GifList data={gifs} />}
      </div>
    </div>
  );
};

export default App;
