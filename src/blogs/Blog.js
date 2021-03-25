import React from 'react';
import './Blog.css';
import Button from "react-bootstrap/Button";
import store from '../store';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
                    store.dispatch(loadBlogEntry(id, result.data))
                    this.setState({
                        data: result.data,
                        loading: false
                    })
                }
            )
            .catch(error => {
                console.log('error', error)
                this.setState({title: "Not avail"})
                this.setState({
                    loading: false
                })
            });
    }

    componentDidMount() {
        const id = this.props.match.params.id

        let cachedBlog = null
        if (store.getState().blogEntries.has(id)) {
            cachedBlog = store.getState().blogEntries.get(id)
            this.setState({
                data: cachedBlog
            })
            store.dispatch(visitBlogEntry(id))
            this.setState({
                loading: false
            })
        } else {
            this.fetchBlogEntry(id)
        }
    }

    goBack() {
        this.props.history.goBack();
    }

    edit(thisPtr) {
        thisPtr.props.history.push("/blog/edit/" + thisPtr.state.data.id)
    }

    render() {
        const thisPtr = this
        if (this.state.loading == true) {
            return <div>
                <p>Loading...</p>
            </div>
        } else {
            return <div className="BlogRoot">
                <div className="BlogContent">
                    <br/>
                    <h3>{this.state.data.title}</h3>
                    <p>Created by {this.state.data.owner} on {new Date(this.state.data.createDate).toLocaleDateString()},
                        <br/>Last modified: {new Date(this.state.data.modifyDate).toLocaleString()}</p>
                    <br/>
                    <br/>
                    <div className="Container" dangerouslySetInnerHTML={{__html: this.state.data.content}}></div>
                    <br/>

                    <Button variant="primary" onClick={() => {
                        this.props.history.push("/blog")
                    }}>Back</Button>{' '}&nbsp;
                    <Button variant="outline-primary" onClick={() => {
                        thisPtr.edit(thisPtr)
                    }}>Edit</Button>{' '}&nbsp;
                    <br/><br/>
                </div>
            </div>
        }
    }
}

const BLOG_ENTRY_LOAD = 'BLOG_ENTRY_LOAD'
const BLOG_ENTRY_VISIT = 'BLOG_ENTRY_VISIT'

function loadBlogEntry(id, entryData) {
    return {
        type: BLOG_ENTRY_LOAD,
        id: id,
        entry: entryData
    }
}

function visitBlogEntry(id) {
    return {
        type: BLOG_ENTRY_VISIT,
        id: id
    }
}

export default Blog;
