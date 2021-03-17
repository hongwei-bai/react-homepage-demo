import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import FlowChatDemo from "./demo/FlowChatDemo"
import QuillDemo from "./demo/QuillDemo";
import UserInfo from "./demo/UserInfo";
import BlogEntryEdit from "./blogs/BlogEntryEdit";
import BlogList from "./blogs/BlogList";
import Blog from "./blogs/Blog";
import UserList from "./admin/UserList";

const domainNameLocalhost = "127.0.0.1:8080";
const domainName = "39.100.128.234";//"hongwei-test.top";
const applicationName = "hongwei-homepage-service"
const prod = "http://" + domainNameLocalhost + "/" + applicationName
const prodWeb = "https://" + domainName + "/" + applicationName
const debug = "http://localhost:8080"
const debugWar = "http://localhost:8080/hongwei-homepage-service-1.0-SNAPSHOT"
window.baseUrl = prodWeb

const applicationNameAuth = "application-service-authentication"
const prodAuth = "https://" + domainName + "/" + applicationNameAuth
const debugAuth = "http://" + domainNameLocalhost
window.baseUrlAuth = debugAuth

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/admin" component={UserList}/>
                    <Route exact path="/blog" component={BlogList}/>
                    <Route path="/blog/category/:categories" component={BlogList}/>
                    <Route path="/blog/tag/:tags" component={BlogList}/>
                    <Route path="/blog/entry/:id" component={Blog}/>
                    <Route path="/blog/edit/:id" component={BlogEntryEdit}/>
                    <Route path="/blog/new" component={BlogEntryEdit}/>
                    <Route path="/about" component={About}/>
                    <Route path="/demo/rdm" component={FlowChatDemo}/>
                    <Route path="/demo/quill" component={QuillDemo}/>
                    <Route path="/demo/info" component={UserInfo}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
