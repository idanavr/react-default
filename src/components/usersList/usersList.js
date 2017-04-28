import React, { Component } from 'react';
import {connect} from 'react-redux'

import userClickAction from './usersList.action';

class userList extends Component {


    render() {
        let {userClick, selectedUser, usersList} = this.props;
        let userinfo = '';
        if(!selectedUser)
            userinfo = 'select user to see more information';
        else
             userinfo = <ul> {Object.keys(selectedUser).map(function(key, index) {
              return (<li key={key}> {key + " : " + selectedUser[key]} </li>) ;
            })} </ul>
        return (
            <div>
            <div>
                <h1>
                    User List:
                </h1>
                <ul>
                    {
                        usersList.slice(0,5).map((user) => {
                            return <li key={user.id} onClick={() => userClick(user)}>{user.first_name}</li>
                        })
                    }
                </ul>
                </div>
                <div>
                <h3>User Info:</h3>
                {userinfo}
                </div>
            </div>
        )
    }   
} 

function mapStateToProps(state) {
    return {
        usersList: state.getUsers,
        selectedUser: state.usersReducer
    }
}

function mapDispatchToProps(dispatch, ownProps){
    return{
        userClick: (user) => dispatch(userClickAction(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(userList)