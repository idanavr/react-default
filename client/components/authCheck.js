import React, { Component } from 'react';  
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

export default function(ComposedComponent, authorityType) {  
  class Authentication extends Component {

    componentDidMount() {
      if(!this.props.auth && authorityType === 1) {
        this.props.history.replace('/login');
      } else if(this.props.auth && authorityType === 0) {
        this.props.history.replace('/');
      }
    }

    componentDidUpdate() { // this function can have 2 variables: prevProps, prevState
      if(!this.props.auth && authorityType === 1) {
        this.props.history.replace('/login');
      } else if(this.props.auth && authorityType === 0) {
        this.props.history.replace('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.loginReducer.auth };
  }

Authentication.propTypes = {
  auth: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

  return connect(mapStateToProps)(Authentication);
}