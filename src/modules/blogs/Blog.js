import React from 'react';
import './Blog.css';
import Button from "react-bootstrap/Button";
import store from '../../reducers/store';
import axios from "axios";
import {BLOG_ENTRY_LOAD, BLOG_ENTRY_VISIT} from "../../reducers/BlogReducer";
import intl from 'react-intl-universal';

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
        axios.get(window.baseUrl + "/blog/" + id + "/entry.do?owner=1")
            .then(response => {
                store.dispatch(loadBlogEntry(id, response.data))
                this.setState({
                    data: response.data,
                    loading: false
                })
            })
            .catch(reason => {
                this.setState({title: "Ops! Something is wrong! Please try again later."})
                this.setState({
                    loading: false
                })
            })
    }

    componentDidMount() {
        const id = this.props.match.params.id

        const entries = store.getState().blogEntries
        let cachedBlog = null
        if (entries !== undefined && entries.has(id)) {
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
        if (this.state.loading === true) {
            return <div>
                <p>{intl.get("blogLoading")}</p>
            </div>
        } else {
            return <div className="BlogRoot">
                <div className="BlogContent">
                    <br/>
                    <h3>
                        <a onClick={() => {
                        this.props.history.push("/blog")
                    }} href="#">&nbsp;&lsaquo;&nbsp;</a>
                        {this.state.data.title}
                    </h3>
                    <p>{intl.get("blogCreatedBy").replace("{author}", this.state.data.owner)
                        .replace("{date}", new Date(this.state.data.createDate).toLocaleDateString())},
                        <br/>{intl.get("blogLastModified")}{new Date(this.state.data.modifyDate).toLocaleString()}</p>
                    <br/>
                    <br/>
                    <div className="Container" dangerouslySetInnerHTML={{__html: this.state.data.content}}></div>
                    <br/>

                    <Button variant="primary" onClick={() => {
                        this.props.history.push("/blog")
                    }}>{intl.get("blogBack")}</Button>{' '}&nbsp;
                    <Button variant="outline-primary" onClick={() => {
                        thisPtr.edit(thisPtr)
                    }}>{intl.get("blogEdit")}</Button>{' '}&nbsp;
                    <br/><br/>
                </div>
            </div>
        }
    }
}

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
