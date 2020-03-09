import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getUserListAction, deleteUserByIdAction } from './usersPanel.action';
import './usersPanel.scss';
import UserList from './userList/userList';

function UsersPanel() {
    const props = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserListAction());
    }, []);

    const { statusMessage, displayList } = props;

    const contentBlock = statusMessage !== null ? getMessageBlock(statusMessage) : getUserListBlock(displayList, dispatch);

    return (
        <div>
            <h2>Users Panel</h2>
            {contentBlock}
        </div>
    );
}

function getMessageBlock(message) {
    return (
        <div>
            {message}
        </div>
    );
}

function getUserListBlock(displayList, dispatch) {
    return (
        <div>
            <UserList
                users={displayList}
                deleteUserById={(id) => dispatch(deleteUserByIdAction(id))} />
        </div>
    );
}

UsersPanel.propTypes = {
    displayList: PropTypes.arrayOf(PropTypes.object),
    statusMessage: PropTypes.string,
};

export default UsersPanel;