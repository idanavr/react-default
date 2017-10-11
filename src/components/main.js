import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import css from './../../style/main.css';
import Navbar from './nav';

import { connect } from 'react-redux';

import { checkTokenFunc } from './login/login.action';

import About from './about';
import authCheck from './authCheck';
import UsersList from './usersList/usersList';
import Register from './register/register';
import Login from './login/login';

class Main extends React.Component {

    componentWillMount() {
        this.props.checkToken(localStorage.jwtToken);
    }

    render() {
        const Container = (props) =>
            <div>
                <Navbar css={css} />
                <div className={css.container}>{props.children}</div>
                <div className={css.footer}>Copyrights © section</div>
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
   

        return (
            <BrowserRouter className="default">
                <Container>
                    <Switch>rew@rew.com
                        <Route exact path="/" component={Welcome} />
                        <Route path="/about" component={About} />
                        <Route path="/users" component={authCheck(UsersList, 1)} />
                        <Route path="/login" component={authCheck(Login, 0)} />
                        <Route path="/register" component={authCheck(Register, 0)} />
                        <Route path="*" component={NoMatch} />
                    </Switch>
                </Container>
            </BrowserRouter>
        );
    }
}
function mapStateToProps(state) {
    return {
        authority: state.loginReducer.auth,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        checkToken: (token) => dispatch(checkTokenFunc(token)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);