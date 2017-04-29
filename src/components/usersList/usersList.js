import React, { Component } from 'react';
import {connect} from 'react-redux'

import userClickAction, {nextUserListFunc, prevUserListFunc, filterUserListFunc} from './usersList.action';

class userList extends Component {


    render() {
        let {userClick, selectedUser, displayList, nextUsersPage, prevUsersPage, filterUsers} = this.props;
        let userinfo = '';
        if(Object.keys(selectedUser).length == 0)
            userinfo = 'select user to see more information';
        else{
             userinfo = <ul> {Object.keys(selectedUser).map(function(key, index) {
              return (<li key={key}> {key + " : " + selectedUser[key]} </li>) ;
            })}  </ul>
        }
        return (
            <div>
            <div>
                <h1>
                    User List:
                </h1>
                <input placeholder="Search by first name" type="text" onChange={(expr) => filterUsers(expr.target.value)} />
                <ul>
                    {
                        displayList.map((user) => {
                            return <li key={user.id} onClick={() => userClick(user)}>{user.first_name}</li>
                        })
                    }
                </ul>
                <button className="btn" onClick={() => prevUsersPage()} > Back </button>
                <button onClick={() => nextUsersPage()} > Next </button>
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
        selectedUser: state.usersReducer.selectedUser,
        displayList: state.usersReducer.displayList
    }
}

function mapDispatchToProps(dispatch, ownProps){
    return{
        nextUsersPage: () => dispatch(nextUserListFunc()),
        prevUsersPage: () => dispatch(prevUserListFunc()),
        userClick: (user) => dispatch(userClickAction(user)),
        filterUsers: (expr) => dispatch(filterUserListFunc(expr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(userList)