import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userClickAction, getUserListFunc, nextUserListFunc, prevUserListFunc, filterUserListFunc, deleteUserByIdFunc } from './usersPanel.action';
import './usersPanel.css';
import UserList from './userList/userList';
import UserInfo from './userInfo/userInfo';

class UsersPanel extends Component {
    componentWillMount() {
        this.props.getUserList();
    }

    render() {
        const { messageToDisplay } = this.props;

        const contentBlock = messageToDisplay !== null ? this.getMessageBlock(messageToDisplay) : this.getUserListBlock();

        return (
            <div>
                <h2>Users Panel</h2>
                {contentBlock}
            </div>
        );
    }

    getMessageBlock(message) {
        return (
            <div>
                {message}
            </div>
        );
    }

    getUserListBlock() {
        const { displayList, selectedUser, userClick, filterUsers, prevUsersPage, nextUsersPage, deleteUserById } = this.props;

        return (
            <div>
                <UserList
                    users={displayList}
                    userClick={userClick}
                    filterUsers={filterUsers}
                    prevUsersPage={prevUsersPage}
                    nextUsersPage={nextUsersPage} />
                <UserInfo user={selectedUser} deleteUserById={deleteUserById} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedUser: state.usersReducer.selectedUser,
        displayList: state.usersReducer.displayList,
        messageToDisplay: state.usersReducer.msg,
    };
}

function mapDispatchToProps(dispatch) { // may also get the value of 'ownProps'
    return {
        getUserList: () => dispatch(getUserListFunc()),
        nextUsersPage: () => dispatch(nextUserListFunc()),
        prevUsersPage: () => dispatch(prevUserListFunc()),
        userClick: (user) => dispatch(userClickAction(user)),
        filterUsers: (expr) => dispatch(filterUserListFunc(expr)),
        deleteUserById: (userId) => dispatch(deleteUserByIdFunc(userId))
    };
}

UsersPanel.propTypes = {
    selectedUser: PropTypes.object,
    displayList: PropTypes.arrayOf(PropTypes.object).isRequired,
    messageToDisplay: PropTypes.string,
    getUserList: PropTypes.func.isRequired,
    userClick: PropTypes.func.isRequired,
    filterUsers: PropTypes.func.isRequired,
    prevUsersPage: PropTypes.func.isRequired,
    nextUsersPage: PropTypes.func.isRequired,
    deleteUserById: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPanel);