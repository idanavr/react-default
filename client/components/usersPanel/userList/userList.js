import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './userList.css';

class UserList extends Component {

    render() {
        const { users, userClick, filterUsers, prevUsersPage, nextUsersPage } = this.props;

        let userListBlock = '';
        if (users && users.length) {
            userListBlock =
                users.map((user) =>
                    <li className="animated jackInTheBox" key={user.email} onClick={() => userClick(user)}>
                        {user.firstName}
                    </li>);
        }
        return (
            <div>
                <input placeholder="Search by first name" type="text" onChange={(expr) => filterUsers(expr.target.value)} />
                <ul id="userList">
                    {userListBlock}
                </ul>
                <div>
                    <button className="btn" onClick={() => prevUsersPage()} >Back</button>
                    <button onClick={() => nextUsersPage()} >Next</button>
                </div>
            </div>
        );
    }
}

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    userClick: PropTypes.func.isRequired,
    filterUsers: PropTypes.func.isRequired,
    prevUsersPage: PropTypes.func.isRequired,
    nextUsersPage: PropTypes.func.isRequired
};

export default UserList;