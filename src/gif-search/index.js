import React from 'react';
import './style.css';
import config from '../config.json';

class SearchGifs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: 'danny',
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
    this.setState({gifs: ''});
  }

  fetchGifs = (searchTerm, imageAmount) => {
    fetch(`https://pixabay.com/api/?key=${config.PIXABAY_API}&q=${searchTerm}&image_type=photo&per_page=${imageAmount}`)
    .then(res => res.json())
    .then(data => {
      let gifs = data.hits.map(item => (
        <img className="gifs" src={item.webformatURL} alt="gif" key={item.id} />
      ));

      this.setState({ gifs })
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchGifs(this.state.searchTerm, this.state.imageAmount)
  }

  componentDidMount() {
    this.fetchGifs(this.state.searchTerm, this.state.imageAmount)
  }

  render() {
    return (
      <div className="gifs-container">
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
          <button onClick={this.handleClear}>Clear gifs</button>
        </div>
        <div className="gifs">
          {this.state.gifs}
        </div>
      </div>
    );
  }
};

export default SearchGifs;