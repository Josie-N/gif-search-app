import React, { Component } from "react";
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

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true,
    };
  }

  //  componentDidMount() is called once, immediately AFTER a component is mounted on the DOM
  // The fetch() method takes one mandatory argument, the path to the resource you want to fetch.

  componentDidMount() {
    this.performSearch();
  }

  handleHeaderClick = () => {
    const url = "https://api.giphy.com/v1/gifs/trending";
    const successCb = (data) => {
      this.setState({
        gifs: data,
        loading: false,
      });
    };
    makeGifCall(url, "", successCb);
  };

  performSearch = (query = "cats") => {
    const url = "https://api.giphy.com/v1/gifs/search";
    const successCb = (data) => {
      this.setState({
        gifs: data,
        loading: false,
      });
    };
    makeGifCall(url, query, successCb);
  };

  render() {
    const { loading, gifs } = this.state;

    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1
              style={{ cursor: "pointer" }}
              className="main-title"
              onClick={this.handleHeaderClick}
            >
              GifSearch
            </h1>
            <SearchForm onSearch={this.performSearch} />
          </div>
        </div>
        <div className="main-content">
          {loading ? <p>Loading...</p> : <GifList data={gifs} />}
        </div>
      </div>
    );
  }
}
