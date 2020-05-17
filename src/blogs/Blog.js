import React from 'react';
import './Blog.css';
import Button from "react-bootstrap/Button";

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
        this.goBack = this.goBack.bind(this);
    }

    fetchBlogEntry(id) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(window.baseUrl + "/blog/" + id + "/entry.do?owner=1", requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    console.log("content: " + result.data.content)
                    this.setState({
                        data: result.data
                    })
                }
            )
            .catch(error => {
                console.log('error', error)
                this.setState({title: "Not avail"})
            });
    }

    componentDidMount() {
        const id = this.props.match.params.id
        this.fetchBlogEntry(id)
    }

    goBack() {
        this.props.history.goBack();
    }

    edit(thisPtr) {
        thisPtr.props.history.push("/blog/edit/" + thisPtr.state.data.id)
    }

    render() {
        const thisPtr = this


        return <div className="BlogRoot">
            <br/>
            <h3>{this.state.data.title}</h3>
            <p>created by {this.state.data.owner} on {new Date(this.state.data.createDate).toLocaleDateString()}, last
                modified: {new Date(this.state.data.modifyDate).toLocaleString()}</p>
            <br/>
            <br/>
            <div className="Container" dangerouslySetInnerHTML={{__html: this.state.data.content}}></div>
            <br/>

            <Button variant="primary" onClick={() => {
                this.goBack()
            }}>Back</Button>{' '}&nbsp;
            <Button variant="outline-primary" onClick={() => {
                thisPtr.edit(thisPtr)
            }}>Edit</Button>{' '}&nbsp;
            <br/><br/>
        </div>
    }
}

export default Blog;
