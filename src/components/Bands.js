import React, { Component } from 'react'
import BandList from './BandList';
import axios from 'axios'

export class Bands extends Component {
  state = {
    bands: [],
    isLoaded: false
  }
  
  componentDidMount() {
    axios.get('http://wp-react-be/wp-json/wp/v2/bands')
    .then(res => this.setState({
      bands: res.data,
      isLoaded: true
    }))
    .catch(err => console.log(err));
  }
 
  render() {
    const {bands, isLoaded } = this.state;
    if(isLoaded){
      return (
        <div>
          {bands.map(band =>(
            <BandList key={band.id} band={band}/>
          ))}
        </div>
      );
    }
    return<h3>Loading....</h3>
  }
}

export default Bands