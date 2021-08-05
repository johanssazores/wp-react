import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

export class BandPage extends Component {
  state = {
    band: {},
    isLoaded: false
  }

  componentDidMount(){
    axios.get(`http://wp-react-be/wp-json/wp/v2/bands/${this.props.match.params.id}`)
    .then(res => this.setState({
      band:res.data,
      isLoaded: true
    }))
    .catch(err => console.log(err));
  }

  render() {
    const {band, isLoaded} = this.state;
    if(isLoaded){
      return (
        <Fragment>
          <Link to="/">Go back</Link>
          <hr />
          <h1>{band.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{__html: band.content.rendered}}>
          </div> 
          <h4>Publisher: {band.acf.genre}</h4>
        </Fragment>
      )
    }
    return <h3>Loading...</h3>
  }
}

export default BandPage;