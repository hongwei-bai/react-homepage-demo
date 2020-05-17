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

let domainName = "127.0.0.1";
let applicationName = "hongwei-homepage-service"
let prod = "https://" + window.domainName + "/" + window.applicationName
let debug = "http://localhost:8082"

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
