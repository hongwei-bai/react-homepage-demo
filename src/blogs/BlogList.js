import React from 'react';
import './BlogList.css';

import withStyles from "@material-ui/core/styles/withStyles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import ItemEntryCard from "./ItemEntryCard";
import {FormControl, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {withRouter} from 'react-router-dom';

const styles = {
    root: {
        display: 'flex'
    },
    orange: {
        backgroundColor: deepOrange[500],
    },
    purple: {
        backgroundColor: deepPurple[500],
    },
};


class BlogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            message: ""
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
                    this.setState({data: result.data})
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
            <img className="BlogListBanner" src={require("../images/blog_banner_full.jpg")} alt="Blog" width="200"
                 height="80"/>
            <div className="BlogListRoot">
                <br/>
                <Button variant="light" onClick={() => this.props.history.push("/")}>&lt;Home</Button>&nbsp;
                <Button variant="primary" onClick={() => this.props.history.push("/blog/new")}> New Post</Button>{' '}
                <br/>
                <br/>
                <InputGroup>
                    <FormControl className="BlogSearch"/>
                </InputGroup>
                <br/>
                <div>
                    <ul>
                        {this.state.data.map((entry) => (
                            <li key={entry.id}>
                                <ItemEntryCard key={entry.id} data={entry} history={this.props.history}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    }
}

export default withRouter(withStyles(styles)(BlogList));
// export default BlogList;
