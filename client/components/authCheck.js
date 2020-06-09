import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { isAllowedToUserRole } from '../utils';

export default function authCheck(ComposedComponent, authorizedRoles) {
  class Authentication extends Component {

    componentDidMount() {
      if (authorizedRoles && !this.props.user) { // only for users
        this.props.history.replace('/login');
      } else if (!authorizedRoles && this.props.user) { // only for non-users
        this.props.history.replace('/');
      } else if (authorizedRoles && !isAllowedToUserRole(this.props.user, authorizedRoles)) { // only for users with the authorized roles
        this.props.history.replace('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { user: state.loginReducer.user };
  }

  Authentication.propTypes = {
    user: PropTypes.object,
    history: PropTypes.object.isRequired
  };

  return connect(mapStateToProps)(Authentication);
}