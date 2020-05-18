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

const domainNameLocalhost = "127.0.0.1";
const domainName = "hongwei-test.top";
const applicationName = "hongwei-homepage-service"
const prod = "https://" + domainName + "/" + applicationName
const debug = "http://localhost:8082"
const debugWar = "http://localhost:8080/hongwei-homepage-service-1.0-SNAPSHOT"
window.baseUrl = prod

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
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
