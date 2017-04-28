import React, { Component } from 'react';
import {Router, Route, Link, IndexRoute, browserHistory, hashHistory, Redirect, withRouter} from 'react-router';
import css from './../../style/main.css';

import Navbar from './nav';

import rootReducer from '../reducers';
// import reduxLogger from "redux-logger"
// import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
// const middleware = applyMiddleware(reduxLogger(),ReduxThunk)
// const store = createStore(rootReducer,{search:{}},middleware)
const store = createStore(rootReducer);

import About from './aboutus';
import usersList from './usersList/usersList'

const Container = (props) => <div className={css["container"]}><Navbar {...css} /><div className={css["content"]}>{props.children}</div></div>  
const NoMatch = () => <div><h2>No page was found 404! </h2></div>
const Welcome = () => <div><h2>Welcome to Default Site</h2></div>

const App = () =>
<Provider store={store}>
    <Router history={hashHistory} className="default">
        <Route path="/" component={Container}>
            <IndexRoute component={Welcome}></IndexRoute>
            <Route path="/about" component={About} />
            <Route path="/users" component={usersList} />
        </Route>
        <Route path="*" component={NoMatch} />
    </Router>
</Provider>
    export default App;