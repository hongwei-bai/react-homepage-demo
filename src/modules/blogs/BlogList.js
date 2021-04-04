import React from 'react';
import './BlogList.css';

import withStyles from "@material-ui/core/styles/withStyles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import ItemEntryCard from "./ItemEntryCard";
import {FormControl, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {withRouter} from 'react-router-dom';
import {blogStore, logInBackgroundStore} from '../../reducers/store';
import {homePageInstance} from "../../network/AxiosInstances"
import {BLOG_LIST_UPDATE} from "../../reducers/BlogReducer";
import intl from 'react-intl-universal';
import {FaFeather} from "react-icons/fa";
import {RiAncientGateLine} from "react-icons/ri";
import {STATUS_REFRESHED, USE_TOKEN} from "../../reducers/LoginBackgroundReducer";

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

function updateBlogList(cur) {
    return {
        type: BLOG_LIST_UPDATE,
        data: cur
    }
}

class BlogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingStatus: loadingStatus.LOADING,
            data: [],
            message: ""
        }
    }

    fetchBlogList() {
        homePageInstance.get("/blog/entry.do")
            .then(response => {
                let dataFromApi = response.data
                if (dataFromApi === undefined) {
                    dataFromApi = []
                }
                this.setState({
                    loadingStatus: loadingStatus.SUCCESS,
                    data: dataFromApi
                })
                logInBackgroundStore.dispatch({type: USE_TOKEN})
                blogStore.dispatch(updateBlogList(dataFromApi))
            })
            .catch(reason => {
                this.setState({
                    loadingStatus: loadingStatus.ERROR,
                    message: reason
                })
            })
    }

    componentDidMount() {
        let cachedBlogList = blogStore.getState().blogList
        if (cachedBlogList !== undefined && cachedBlogList.length > 0) {
            this.setState({
                loadingStatus: loadingStatus.SUCCESS,
                data: cachedBlogList
            })
        } else {
            this.fetchBlogList()
        }
        logInBackgroundStore.subscribe(() => {
            if (logInBackgroundStore.getState().refreshTokenStatus === STATUS_REFRESHED) {
                this.fetchBlogList()
            }
        })
    }

    render() {
        return <div className="BlogListFontStyle">
            <img className="BlogListBanner" src={require("../../images/blog_banner_full.jpg")} alt="Blog" width="200"
                 height="80"/>
            <div className="BlogListRoot">
                <br/>
                <Button variant="light" className={"BlogListIconButton"}
                        onClick={() => this.props.history.push("/")}>
                    <RiAncientGateLine className={"BlogListIcon"}/>
                    &nbsp;{intl.get("blogBackButton")}
                </Button>&nbsp;
                <Button variant="primary" className={"BlogListPrimaryButton"}
                        onClick={() => this.props.history.push("/blog/new")}>
                    <FaFeather className={"BlogListIconEmbedded"}/>&nbsp;&nbsp;
                    {intl.get("newPost")}</Button>{' '}
                <br/>
                <br/>
                <InputGroup>
                    <FormControl className="BlogSearch"/>
                </InputGroup>
                <br/>
                <div>
                    <BlogListContent
                        loadingStatus={this.state.loadingStatus}
                        data={this.state.data}
                        history={this.props.history}/>
                </div>
            </div>
        </div>
    }
}

function BlogListContent(props) {
    switch (props.loadingStatus) {
        case "success":
            if (props.data.length > 0) {
                return (
                    <div>
                        <ul>
                            {props.data.map((entry) => (
                                <li key={entry.id}>
                                    <ItemEntryCard key={entry.id} data={entry} history={props.history}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            } else {
                return (
                    <p>{intl.get("blogListEmpty")}</p>
                )
            }
        case "loading":
            return (
                <p>{intl.get("blogLoading")}</p>
            )
        case "error":
        default:
            return (
                <p>{intl.get("blogError")}</p>
            )
    }
}

const loadingStatus = {
    LOADING: "loading",
    ERROR: "error",
    SUCCESS: "success",
}

export default withRouter(withStyles(styles)(BlogList));
