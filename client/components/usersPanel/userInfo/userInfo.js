import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './userInfo.css';

class UserInfo extends Component {

    render() {
        const { user, deleteUserById } = this.props;
        let userInformation = '';

        if (!user || Object.keys(user).length === 0)
            userInformation = 'select user to see more information';
        else {
            userInformation =
                <ul className="animated bounceInUp"> {Object.keys(user)
                    .filter((key) => key !== 'id')
                    .map((key) =>
                        <li key={key}>
                            {`${key} : ${user[key]}`}
                        </li>)}
                    <button onClick={() => deleteUserById(user.id)}>Delete</button>
                </ul>;
        }

        return (
            <div>
                <h3>User Info:</h3>
                {userInformation}
            </div>
        );
    }
}

UserInfo.propTypes = {
    user: PropTypes.object,
    deleteUserById: PropTypes.func.isRequired
};

export default UserInfo;