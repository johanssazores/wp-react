import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import PropTypes from 'prop-types'

export class BandList extends Component {
  state = {
    imgUrl: '',
    author: '',
    isLoaded: false
  }
  static propTypes = {
    band: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { featured_media, author } = this.props.band;
    const getImageUrl = axios.get(`http://wp-react-be/wp-json/wp/v2/media/${featured_media}`);
    const getAuthor = axios.get(`http://wp-react-be/wp-json/wp/v2/users/${author}`);

    Promise.all([getImageUrl, getAuthor]).then(res => {
      console.log(res)
      this.setState({
        imgUrl: res[0].data.media_details.sizes.full.source_url,
        author: res[1].data.name,
        isLoaded: true
      });
    });
  }

  render() {
    const { id, title, excerpt } = this.props.band;
    const { author, imgUrl, isLoaded } = this.state;
    if(isLoaded) {
      return (
        <div>
          <h2 style={{marginBottom: '0'}}>{title.rendered}</h2>
          <small>Review by <strong>{author}</strong></small>
          <img src={imgUrl} alt={title.rendered} />
          <div style={{width: "100%"}} dangerouslySetInnerHTML={{__html: excerpt.rendered}}></div>
          <Link to={`/band/${id}`}>Band Review</Link>
          <hr />
        </div>
      )
    }
    return null;
  }
}

export default BandList