import React from 'react';
import './Blog.css';
import Button from "react-bootstrap/Button";
import {blogStore} from '../../reducers/store';
import {BLOG_ENTRY_LOAD, BLOG_ENTRY_VISIT} from "../../reducers/BlogReducer";
import intl from 'react-intl-universal';
import {blogInstance} from "../../network/AxiosInstances";
import {canEditBlog} from "../../services/PricilegeService";

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            canEdit: false,
            data: {}
        }
        this.goBack = this.goBack.bind(this);
    }

    fetchBlogEntry(id) {
        blogInstance.get("/blog/" + id + "/entry.do")
            .then(response => {
                blogStore.dispatch(loadBlogEntry(id, response.data))
                this.setState({
                    data: response.data,
                    canEdit: canEditBlog(response.data.owner),
                    loading: false
                })
            })
            .catch(reason => {
                this.setState({title: intl.get("blogError")})
                this.setState({
                    loading: false
                })
            })
    }

    componentDidMount() {
        const id = this.props.match.params.id

        const entries = blogStore.getState().blogEntries
        let cachedBlog = null
        if (entries !== undefined && entries.has(id)) {
            cachedBlog = blogStore.getState().blogEntries.get(id)
            this.setState({
                data: cachedBlog
            })
            blogStore.dispatch(visitBlogEntry(id))
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
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
                    {this.state.canEdit && <Button variant="outline-primary" onClick={() => {
                        thisPtr.edit(thisPtr)
                    }}>{intl.get("blogEdit")}</Button>}
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
