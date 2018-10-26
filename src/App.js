import React, {Component} from 'react';
import Main from './components/Main';
import './App.css';
import {store} from "statorgfc";
import 'typeface-roboto';
import withRoot from './withRoot';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './css/styles.css';

store.initialize({
  lastViewed: '',
  viewHistory: [],
  books: [],
  loading: false,
  viewedTitle: '',
  viewedInfo: '',
  formValue: '',
  purchases: []
});

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing.unit * 3}px`,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
});

class App extends Component {
    render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
          <div className={classes.root}>
            <Main/>
          </div>
      </React.Fragment>
    )
  }
}


App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(App));
