import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import * as actions from './store/actions/index'
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {

  componentDidMount(){
    this.props.onCheckAuthStatus();    
  }
  
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          {this.props.isAuthenticated ? <Route path="/" name="Home" component={DefaultLayout} /> : null}
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.userId !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthStatus: () => dispatch(actions.checkAuthStatus()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
