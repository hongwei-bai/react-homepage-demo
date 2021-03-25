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
import FileUploadPage from "./summer/FileUploadPage";

window.baseUrl = process.env.REACT_APP_SERVICE_DOMAIN + process.env.REACT_APP_SERVICE_HOME
window.baseUrlAuth = process.env.REACT_APP_SERVICE_DOMAIN + process.env.REACT_APP_SERVICE_AUTHENTICATION
window.baseFileServer = process.env.REACT_APP_SERVICE_DOMAIN + process.env.REACT_APP_FILE_SERVER

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
                    <Route path="/summer/upload" component={FileUploadPage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
