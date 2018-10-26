import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { store } from 'statorgfc';

class ListItem extends Component {
  constructor(props) {
    super(props);
    store.connectComponentState(this, ['lastViewed', 'viewHistory', 'books', 'loading']);
  }

  render() {
    const lastViewed = (this.state.lastViewed === this.props.title);
    return (
      <li className={(lastViewed) ? `last-viewed` : ''}>
        {(lastViewed) ? '*' : ''} {this.props.title}: &nbsp; <Link to={`/detail?title=${this.props.title}`}>More Info</Link>
      </li>
    )
  }
}

export default ListItem;
