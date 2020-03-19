import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './main.scss';
import '../assets/css/animate.css';
import { verifyUserAction } from './login/login.action';
// Google analytics
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108374358-1');
ReactGA.set({ page: location.pathname + location.search });
ReactGA.pageview(location.pathname + location.search);

import Navbar from './nav/nav';
import About from './about/about';
import authCheck from './authCheck';
import UserEditProfile from './userPanel/userEditProfile/userEditProfile';
import UsersPanel from './adminPanel/usersPanel/usersPanel';
import Register from './register/register';
import Login from './login/login';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

class Main extends React.Component {

    componentDidMount() {
        this.props.verifyUser();
    }

    render() {
        const Container = (props) =>
            <div>
                <Navbar ReactGA={ReactGA} />
                <div className="container">{props.children}</div>
                <div className="footer">Copyrights © section</div>
            </div>;

        const NotFound = () =>
            <div>
                <h2>This page is not available</h2>
            </div>;

        const Welcome = () =>
            <div className="animated fadeIn">
                <h2>Welcome to React Default</h2>
                I hope this template will help you to build your projects. <br />
                If you have any questions or requests, feel free to contact me. <br /><br />
                Enjoy it!
            </div>;

        if (typeof this.props.user !== 'undefined') {
            return (
                <BrowserRouter>
                    <Container>
                        <Switch>
                            <Route exact path="/" component={Welcome} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/admin/users" component={authCheck(UsersPanel, ['admin'])} />
                            <Route exact path="/user/edit" component={authCheck(UserEditProfile, [])} />
                            <Route exact path="/login" component={authCheck(Login)} />
                            <Route exact path="/register" component={authCheck(Register)} />
                            <Route path="*" component={NotFound} />
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
        user: state.loginReducer.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        verifyUser: () => dispatch(verifyUserAction()),
    };
}

Main.propTypes = {
    user: PropTypes.object,
    verifyUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);