import React, { Component } from 'react';  
import { connect } from 'react-redux';

export default function(ComposedComponent, authorityType) {  
  class Authentication extends Component {

    componentWillMount() {
      if(!this.props.auth && authorityType === 1) {
        this.props.history.replace('/login');
      } else if(this.props.auth && authorityType === 0) {
        this.props.history.replace('/');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.auth && authorityType === 1) {
        this.props.history.replace('/login');
      } else if(nextProps.auth && authorityType === 0) {
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

  return connect(mapStateToProps)(Authentication);
}