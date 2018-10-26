import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { store } from 'statorgfc';
import { fetchData } from '../services/FetchData';
import Typography from '@material-ui/core/Typography';
import withRoot from '../withRoot';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
  centre: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    listStyleType: 'none',
  },
  listClean: {
    listStyle: 'none'
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    store.connectComponentState(this, ['viewHistory', 'loading', 'purchases']);
  }

  async getPurchases() {
    store.set({
      loading: true
    });
    const purchases = await fetchData(`transactions`);
    if (purchases) {
      store.set({
        purchases: purchases.map(item => ({
          email: item.payload.formValue,
          title: item.payload.purchaseTitle
        }))
      });
    }
  }

  componentDidMount() {
    this.getPurchases();
  }

  render() {
    const purchases = store.get('purchases');
    const viewHistory = store.get('viewHistory');
    let homeRoute;
    let homeCopy;
    if (purchases.length > 0) {
      homeRoute = purchases;
      homeCopy = `Recent purchases:`;
    } else if ((purchases.length === 0) && (viewHistory.length !== 0)) {
      homeRoute = viewHistory;
      homeCopy = `Recent viewing history:`;
    } else {
      homeRoute = null;
      homeCopy = `You haven't viewed any documents yet`;
    }
    return (
      <div>
        <Typography variant="h1" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="h3" gutterBottom>A Great Mr Men Documents Website</Typography>
        <Typography variant={`body1`}>
          { homeRoute ? (
            <ul className={`centre`}>
                <li className={`listClean`}>
                  {homeCopy}
                </li>
            { homeRoute.map((item, index) => (
              <li key={index} className={`listClean`}>
                { (item.title) ? item.title : item }
              </li>
            ))}
            </ul>
          ) : (
            <p>{ homeCopy }</p>
            )
          }

          <Link to='/list'>View The Document List</Link>
        </Typography>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Home));
