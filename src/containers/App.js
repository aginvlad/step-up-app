import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Authorization from './Authorization/Authorization';
import Dashboard from './Dashboard/Dashboard';
import { authCheckState } from '../store/reducers/auth/actions';

class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Authorization} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isSignedIn) {
      routes = (
        <Switch>
          <Route path="/dashboard" exact component={Dashboard} />
          <Redirect to="/dashboard" />
        </Switch>
      );
    }

    return routes;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authCheckState: () => dispatch(authCheckState())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
