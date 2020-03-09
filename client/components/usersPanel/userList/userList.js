/* eslint react/display-name:0 */
import React, { forwardRef } from 'react';
import { PropTypes } from 'prop-types';
import { usersInPage } from 'config';
import './userList.scss';
import MaterialTable from 'material-table';
import MTableToolbar from 'material-table/dist/components/m-table-toolbar';
import { Paper, TablePagination } from '@material-ui/core';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Search from '@material-ui/icons/Search';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';

const tableIcons = {
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
};

function UserList(props) {
    const { users, deleteUserById } = props;
    const columns = [
        { title: 'First name', field: 'firstName' },
        { title: 'Last name', field: 'lastName' },
        { title: 'Email', field: 'email' },
        { title: 'Gender', field: 'gender' },
    ];

    let userListBlock = '';
    if (users && users.length) {
        userListBlock = (
            <MaterialTable
                className="dsf"
                icons={tableIcons}
                columns={columns}
                data={users}
                editable={{
                    onRowDelete: (user) =>
                        new Promise((resolve) => {
                            deleteUserById(user.id);
                            resolve();
                        })
                }}
                localization={{
                    header: {
                        actions: ''
                    },
                }}
                components={{
                    Container: (containerProps) => (
                        <Paper className="control-panel" {...containerProps} />
                    ),
                    Toolbar: (toolbarProps) => (
                        <div className="toolbar">
                            <MTableToolbar {...toolbarProps} />
                        </div>),
                    Pagination: (tablePaginationProps) => (
                        <TablePagination {...tablePaginationProps} rowsPerPageOptions={[]} />
                    ),
                }}
                options={{
                    showTitle: false,
                    pageSize: usersInPage,
                }}
            />);
    }

    return (
        <div id="userList" className="animated fadeIn">
            {userListBlock}
        </div>
    );
}

UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteUserById: PropTypes.func.isRequired,
};

export default UserList;