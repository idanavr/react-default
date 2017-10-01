import React from 'react';
// import {Router, Route, Link, IndexRoute, browserHistory, hashHistory, Redirect, withRouter} from 'react-router';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import css from './../../style/main.css';

import Navbar from './nav';

import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware ,createStore } from 'redux'; // may also export 'applyMiddleware'
const middleware = applyMiddleware(createLogger(), ReduxThunk);
const store = createStore(rootReducer, { }, middleware);
// const store = createStore(rootReducer);

import About from './aboutus';
import usersList from './usersList/usersList';
import register from './register/register';

const Container = (props) => 
    <div>
        <Navbar {...css} />
        <div className={ css.container }>{props.children}</div>
        <div className= { css.footer }>Copyrights © section</div>
    </div>;
const NoMatch = () => 
    <div>
        <h2>No page was found 404! </h2>
    </div>;
const Welcome = () => 
    <div>
        <h2>Welcome to React Default</h2>
        I hope this template will help you to build your projects. <br />
        If you have any questions or requests, feel free to contact me. <br /><br />
        Enjoy it!
    </div>;

const App = () =>
    <Provider store={store}>
        <BrowserRouter className="default">
            <Container>
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route path="/about" component={About} />
                    <Route path="/users" component={usersList} />
                    <Route path="/register" component={register} />
                    <Route path="*" component={NoMatch} />
                </Switch>
            </Container>
        </BrowserRouter>
    </Provider>;
export default App;