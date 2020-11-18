import React, { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

const makeGifCall = (url, query, successCb) => {
  axios
    .request({
      url,
      method: "GET",
      params: {
        api_key: "P5W09GD0AkqX56pvDYmVZFZliFKI9Lbl",
        limit: 15,
        q: query,
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

  const handleHeaderClick = () => {
    const url = "https://api.giphy.com/v1/gifs/trending";
    const successCb = (data) => {
      setGifsData(data);
      changeLoadingStatus(false);
    };
    makeGifCall(url, "", successCb);
  };

  const performSearch = (query = "cats") => {
    const url = "https://api.giphy.com/v1/gifs/search";
    const successCb = (data) => {
      setGifsData(data);
      changeLoadingStatus(false);
    };
    makeGifCall(url, query, successCb);
  };

  useEffect(() => {
    performSearch();
  }, []);

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
          <SearchForm onSearch={performSearch} />
        </div>
      </div>
      <div className="main-content">
        {isLoading ? <p>Loading...</p> : <GifList data={gifs} />}
      </div>
    </div>
  );
};

export default App;
