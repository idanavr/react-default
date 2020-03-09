import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './main.scss';
import '../assets/css/animate.css';
import { checkTokenAction } from './login/login.action';
// Google analytics
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108374358-1');
ReactGA.set({ page: location.pathname + location.search });
ReactGA.pageview(location.pathname + location.search);

import Navbar from './nav/nav';
import About from './about/about';
import authCheck from './authCheck';
import UserEditProfile from './userPanel/userEditProfile/userEditProfile';
import UsersPanel from './usersPanel/usersPanel';
import Register from './register/register';
import Login from './login/login';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

class Main extends React.Component {

    componentDidMount() {
        this.props.checkToken(localStorage.jwtToken);
    }

    render() {
        const Container = (props) =>
            <div>
                <Navbar ReactGA={ReactGA} />
                <div className="container">{props.children}</div>
                <div className="footer">Copyrights © section</div>
            </div>;

        const NoMatch = () =>
            <div>
                <h2>No page was found 404!</h2>
            </div>;

        const Welcome = () =>
            <div className="animated fadeIn">
                <h2>Welcome to React Default</h2>
                I hope this template will help you to build your projects. <br />
                If you have any questions or requests, feel free to contact me. <br /><br />
                Enjoy it!
            </div>;

        if (this.props.authority !== null) {
            return (
                <BrowserRouter>
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Welcome} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/users" component={authCheck(UsersPanel, 1)} />
                            <Route exact path="/user/edit" component={authCheck(UserEditProfile, 1)} />
                            <Route exact path="/login" component={authCheck(Login, 0)} />
                            <Route exact path="/register" component={authCheck(Register, 0)} />
                            <Route path="*" component={NoMatch} />
                        </Switch>
                    </Container>
                </BrowserRouter>
            );
        }
        return (
            <div className="loadingPage">
                <HourglassEmptyIcon fontSize="large" />
            </div>
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
        checkToken: (token) => dispatch(checkTokenAction(token)),
    };
}

Main.propTypes = {
    authority: PropTypes.string,
    checkToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);