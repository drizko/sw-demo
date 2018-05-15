import React from 'react';
import './style.css';
import config from '../config.json';
import ProgressiveImage from 'react-progressive-image';

class SearchImgs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: 'USA',
      imageAmount: 3
    };
  }

  handleQueryChange = (event) => {
    this.setState({searchTerm: event.target.value});
  }

  handleAmountChange = (event) => {
    this.setState({imageAmount: event.target.value});
  }

  handleClear = () => {
    this.setState({imgs: ''});
  }

  fetchImgs = (searchTerm, imageAmount) => {
    fetch(`https://pixabay.com/api/?key=${config.PIXABAY_API}&q=${searchTerm}&image_type=photo&per_page=${imageAmount}`, { credentials: 'same-origin'})
    .then(res => res.json())
    .then(data => {
      let imgs = data.hits.map(item => (
        <ProgressiveImage className="imgs" key={item.id} src={item.webformatURL} placeholder='Eclipse-1s-200px.svg'>
          {(src) => <img className="imgs" src={src} alt='something'/>}
        </ProgressiveImage>
      ));

      this.setState({ imgs })
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchImgs(this.state.searchTerm, this.state.imageAmount)
  }

  componentDidMount() {
    this.fetchImgs(this.state.searchTerm, this.state.imageAmount)
  }

  render() {
    return (
      <div className="imgs-container">
        <div className="search-form">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.searchTerm} onChange={this.handleQueryChange} />
              <div>
              Image Amount:
                <input type="text" value={this.state.imageAmount} onChange={this.handleAmountChange} />
              </div>
            </label>
            <input type="submit" value="Submit" />
          </form>
          <button onClick={this.handleClear}>Clear imgs</button>
        </div>
        <div className="imgs">
          {this.state.imgs}
        </div>
      </div>
    );
  }
};

export default SearchImgs;