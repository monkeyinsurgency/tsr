import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from './ListItem';
import { fetchData } from '../services/FetchData';
import {store} from 'statorgfc';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

class List extends Component {
  constructor(props) {
    super(props);
    store.connectComponentState(this, ['lastViewed', 'viewHistory', 'books', 'loading']);
  }

  async getBooks() {
    const result = await fetchData('books');
    store.set({
      lastViewed: store.get('lastViewed'),
      viewHistory: store.get('viewHistory'),
      loading: false,
      books: result.map(item => ({
        title: item.Title,
        info: item.Info
      }))
    });
  }

  componentDidMount() {
      this.getBooks();
  }

  render() {
    const bookAry = store.get('books');
    return (
      <div>
        <Typography variant="h1" gutterBottom>Documents</Typography>
        <Typography variant="body1">
          <ul>
            { bookAry.map((item, index) => (
              <ListItem key={index} {...item} />
            ))}
          </ul>
          <Link to="/home">Return To The Home Page</Link>
        </Typography>

      </div>
    );
  }
}

//List.propTypes = {};

export default List;
