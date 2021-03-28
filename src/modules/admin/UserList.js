import React from 'react';
import './UserList.css';

import withStyles from "@material-ui/core/styles/withStyles";
import {withRouter} from 'react-router-dom';

class UserList extends React.Component {
    fetchUserList() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(window.baseUrl + "/blog/entry.do?owner=1", requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    this.setState({data: result.data})
                }
            )
            .catch(error => {
                console.log('error', error)
                this.setState({message: error})
            });
    }

    componentDidMount() {
        // this.fetchBlogList()
    }

    render() {
        return <p>User admin</p>
    }
}

export default withRouter(UserList);
