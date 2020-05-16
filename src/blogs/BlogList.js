import React from 'react';
import './BlogList.css';

import Button from '@material-ui/core/Button';

class BlogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: Array,
            message: String
        }
    }

    fetchBlogList() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(window.baseUrl + "/blog/entry.do?owner=1", requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    this.setState({message: result["message"]})
                    // this.setState({list: result})
                }
            )
            .catch(error => {
                console.log('error', error)
                this.setState({message: error})
            });
    }

    componentDidMount() {
        this.fetchBlogList()
    }

    render() {
        return <div>
            "length: "{this.state.list.length}<br/>
            {this.state.message}
        </div>
    }
}

export default BlogList;
