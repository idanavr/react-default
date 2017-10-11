import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { userClickAction, getUsersListFunc, nextUserListFunc, prevUserListFunc, filterUserListFunc, deleteUserByIdFunc } from './usersList.action';

class userList extends Component {
    componentWillMount (){
        this.props.getUsersList();
     }

    // componentWillUpdate (nextProps){
    //     if (!nextProps.authority) {
    //         this.props.history.push('/login');
    //     }
    //  }

    render() {
        const { userClick, selectedUser, displayList, nextUsersPage, prevUsersPage, filterUsers, messageToDisplay, deleteUserById } = this.props;
        let userinfo = '';
        let userListBlock = '';
        if (messageToDisplay === null) {
            userListBlock =
                displayList.map((user) =>
                    <li key={user.email} onClick={() => userClick(user)}>
                        {user.firstName}
                    </li>);
        } else {
            userListBlock = messageToDisplay;
        }

        if(Object.keys(selectedUser).length === 0)
            userinfo = 'select user to see more information';
        else{
             userinfo = 
                 <ul> {Object.keys(selectedUser)
                     .filter((key) => key !== '_id')
                     .map((key) =>
                         <li key={key}>
                             {`${key} : ${selectedUser[key]}`}
                         </li>)}
                         <li>
                            <button onClick={() => deleteUserById(selectedUser._id) }> Delete </button>
                         </li>
                 </ul>;
        }
        return (
            <div>
                <div>
                    <h2>
                        User List:
                    </h2>
                    <input placeholder="Search by first name" type="text" onChange={(expr) => filterUsers(expr.target.value)} />
                    <ul>
                    { userListBlock }
                    </ul>
                    <button className="btn" onClick={() => prevUsersPage()} > Back </button>
                    <button onClick={() => nextUsersPage()} > Next </button>
                </div>
                <div>
                    <h3>User Info:</h3>
                    { userinfo }
                </div>
            </div>
        );
    }   
} 

function mapStateToProps(state) {
    return {
        selectedUser: state.usersReducer.selectedUser,
        displayList: state.usersReducer.displayList,
        messageToDisplay: state.usersReducer.msg,
        authority: state.loginReducer.auth,
    };
}

function mapDispatchToProps(dispatch){ // may also get the value of 'ownProps'
    return {
        getUsersList: () => dispatch(getUsersListFunc()),
        nextUsersPage: () => dispatch(nextUserListFunc()),
        prevUsersPage: () => dispatch(prevUserListFunc()),
        userClick: (user) => dispatch(userClickAction(user)),
        filterUsers: (expr) => dispatch(filterUserListFunc(expr)),
        deleteUserById: (userId) => dispatch(deleteUserByIdFunc(userId))
    };
}

userList.propTypes = {
    messageToDisplay: PropTypes.string,
    selectedUser: PropTypes.object,
    displayList: PropTypes.array.isRequired,
    getUsersList: PropTypes.func.isRequired,
    userClick: PropTypes.func.isRequired,    
    nextUsersPage: PropTypes.func.isRequired,
    prevUsersPage: PropTypes.func.isRequired,
    filterUsers: PropTypes.func.isRequired,
    deleteUserById: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(userList);