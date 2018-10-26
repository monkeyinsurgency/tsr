import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {store} from 'statorgfc';

import Home from './Home';
import List from './List';
import Detail from './Detail';
import PropTypes from "prop-types";
import withRoot from "../withRoot";
import {withStyles} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import 'typeface-roboto';

const styles = theme => ({
  centre: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    store.connectComponentState(this, ['lastViewed', 'viewHistory', 'books', 'loading']);
  }

  render() {
    return (
      <main>
        <Typography>
          <Switch>
            <Route exact path='/' component={Home} />
            <Redirect from="/home" to="/"/>
            <Route path='/list' component={List} />
            <Route path='/detail' component={Detail} />
          </Switch>
        </Typography>
      </main>
    )
  }
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Main));
