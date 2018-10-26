import React, { Component } from 'react';
import { fetchData } from '../services/FetchData';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import queryString from 'query-string';
import { store } from 'statorgfc';
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

class Detail extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    store.connectComponentState(this, ['lastViewed', 'viewHistory', 'loading', 'viewedTitle', 'viewedInfo', 'formValue']);
  }

  async getBook() {
    const qs = queryString.parse(this.props.location.search);
    store.set({
      loading: true
    });
    const result = await fetchData(`books?Title=${qs.title}`);
    let viewHistoryAry = this.state.viewHistory;
    if (viewHistoryAry.indexOf(result[0].Title) === -1) {
      viewHistoryAry.push(result[0].Title);
    }
    store.set({
      lastViewed: result[0].Title,
      viewHistory: viewHistoryAry,
      loading: false,
      viewedTitle: result[0].Title,
      viewedInfo: result[0].Info
    });
  }

  componentDidMount() {
    this.getBook();
  }

  handleChange(event) {
    store.set({formValue: event.target.value});
  }

  async handleSubmit(event) {
    let formValue = store.get('formValue');
    let purchaseTitle = store.get('viewedTitle');
    fetchData(`transactions`, { formValue, purchaseTitle }, 'post');
    createBrowserHistory().push('/');
  }

  render() {
    const { viewedTitle, viewedInfo} = this.state;
    return (
      <div>
        <Typography variant="h1" gutterBottom>{viewedTitle}</Typography>
        <Typography variant="h2" gutterBottom>Information</Typography>
        <Typography variant={`body1`}>
          <p>{viewedInfo}</p>
          <p><Link to={"/list"}>No Thanks</Link></p>

          <div>
            Email Address:
            <form>
              <input type="text" onChange={this.handleChange} name="email" />
              <Link to={'/'} onClick={this.handleSubmit}>Buy document/book</Link>
            </form>
          </div>
        </Typography>
      </div>
    );
  }
}

Detail.propTypes = {};

export default Detail;
