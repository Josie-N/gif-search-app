import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  }
  
  // TO DO: why is this not working?
  // let url = 'http://api.giphy.com/v1/gifs/trending?api_key=P5W09GD0AkqX56pvDYmVZFZliFKI9Lbl&limit=10';

  //  componentDidMount() is called once, immediately AFTER a component is mounted on the DOM
  // The fetch() method takes one mandatory argument, the path to the resource you want to fetch.
 
  componentDidMount() {
    // axios.get(url[, config])
    // axios.get() and axios.post()
    // The get() method requires two parameters to be supplied to it. 
    // First, it needs the URI of the service endpoint. 
    // Second, it should be passed an object that contains the properties we want to send to our server.

    // Once an HTTP request is made, Axios returns a promise that is either fulfilled or rejected, 
    // depending on the response from the backend service.
    // If the promise is fulfilled, the first argument of then() will be called; if the promise is rejected, the second argument will be called. 
    
    // axios.get('http://api.giphy.com/v1/gifs/trending?api_key=P5W09GD0AkqX56pvDYmVZFZliFKI9Lbl&limit=10')
    // .then(response => {
    //   console.log('response', response)
    //   this.setState({
    //     gifs: response.data.data
    //   })
    // })
    // .catch(error => {
    //   console.log('Error fetching and parsing data', error)
    // });

    this.performSearch();
  }


  handleClick = () => {
    axios.request({
      url: 'https://api.giphy.com/v1/gifs/trending',
      method: 'GET',
      params: {
        api_key:'P5W09GD0AkqX56pvDYmVZFZliFKI9Lbl',
        limit: 15
      }
    }).then(({data}) => {
      this.setState({
        gifs: data.data
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    });
}


  performSearch = (query = 'cats') => {
    // axios.request({
    //   url: 'api.giphy.com/v1/gifs/search',
    //   method: 'GET',
    //   params: {
    //     api_key:'P5W09GD0AkqX56pvDYmVZFZliFKI9Lbl',
    //     limit: 15,
    //     q: `${query}`,
    //   }
    // }).then(({data}) => {
    //   this.setState({
    //     gifs: data.data
    //   })
    // })
    // .catch(error => {
    //   console.log('Error fetching and parsing data', error)
    // });

     axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=P5W09GD0AkqX56pvDYmVZFZliFKI9Lbl&limit=15`)
    .then(response => {
      console.log('response', response)
      this.setState({
        gifs: response.data.data,
        loading: false
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error)
    });
  }

  render() { 
    const { loading, gifs} = this.state;

    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 style={{cursor: 'pointer'}} className="main-title" onClick={this.handleClick}>GifSearch</h1>
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
