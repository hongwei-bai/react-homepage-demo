import React from 'react';
import bannerBg from '../../images/space.jpg';
import bannerBgW from '../../images/space.webp';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Col, Row} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import ImageWebp from '../../components/ImageWebp/ImageWebp';
import Dashboard from "../dashboard/Dashboard";
import intl from 'react-intl-universal';
import axios from "axios";
import {message} from 'antd';
import store from '../../reducers/store';
import {logInStore} from '../../reducers/store';
import {LOGIN, LOGOUT} from "../../reducers/LoginReducer";
import {
    clearCookieCredentials,
    getCredentialRequestBody,
    isGuest,
    isValidGuestCode,
    recoverLoginStatusFromCookie, writeCookieCredentials
} from "../../services/LoginService";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            loggedInUser: "",
            logInError: "",
            showPasswordField: false,
            username: "",
            password: ""
        }
        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.onKeyup = this.onKeyup.bind(this)
        this.onKeydown = this.onKeydown.bind(this)
    }

    onKeyup(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            this.login()
        }
    }

    onKeydown(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    onUsernameChange(event) {
        this.setState({
            username: event.target.value
        })

        if (isValidGuestCode(event.target.value)) {
            this.setState({
                showPasswordField: false
            })
        } else {
            this.setState({
                showPasswordField: true
            })
        }
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    login() {
        this.displayLoginLoading()
        axios({
            method: 'post',
            url: window.baseUrlAuth + "/authenticate/login.do",
            data: getCredentialRequestBody(this.state.username, this.state.password)
        }).then(response => {
            if (response.data.accessToken != null && response.data.refreshToken != null) {
                this.displayLoginSuccessMessage()
                this.handleLoginSuccess(this.state.username, response)
                this.setState({
                    username: "",
                    logInError: "",
                    password: ""
                })
            } else {
                this.displayLoginFailureMessage()
                this.handleLoginFailure("null tokens")
                this.setState({
                    logInError: "Log in fail!",
                    password: ""
                })
            }
        }).catch(reason => {
            this.displayLoginFailureMessage()
            this.handleLoginFailure(reason)
            this.setState({
                logInError: "Log in fail!",
                password: ""
            })
        })
    }

    logout() {
        store.dispatch({
            type: LOGOUT
        })
        this.setState({
            logInError: "",
            username: "",
            password: "",
            showPasswordField: false
        })
        clearCookieCredentials()
        this.render()
    }

    componentDidMount() {
        logInStore.subscribe(() => {
            this.setState({
                loggedIn: store.getState().isLoggedIn,
                loggedInUser: store.getState().userName,
            })
        })
        recoverLoginStatusFromCookie()
    }

    getGreeting() {
        if (isGuest(this.state.loggedInUser)) {
            return "Hello guest "
        } else {
            return "Hello " + this.state.loggedInUser
        }
    }

    handleLoginSuccess(userName, response) {
        const jwt = response.data.accessToken
        store.dispatch({
            type: LOGIN,
            accessToken: jwt,
            refreshToken: response.data.refreshToken,
            userName: userName,
            userRole: response.data.role,
            preferenceJson: response.data.preferenceJson,
            privilegeJson: response.data.privilegeJson
        })
        if (jwt != null) {
            writeCookieCredentials({
                userName: userName,
                role: response.data.role,
                accessToken: jwt,
                refreshToken: response.data.refreshToken,
                preferenceJson: response.data.preferenceJson,
                privilegeJson: response.data.privilegeJson
            })
        } else {
            clearCookieCredentials()
        }
    }

    handleLoginFailure(reason) {
        clearCookieCredentials()
        console.log('error', reason)
    }

    displayLoginLoading = (name) => {
        message.loading({content: 'Logging in...', duration: 0, key: 'updatable'});
    };

    displayLoginSuccessMessage = () => {
        message.success({content: 'Log in success!', key: 'updatable'});
    };

    displayLoginFailureMessage = () => {
        message.error({content: 'Log in failed!', key: 'updatable'});
    };

    render() {
        return (
            <div className="App">
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                <link href="https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Abel&display=swap" rel="stylesheet"/>
                <ul>
                    <li className="Banner">
                        <ImageWebp srcWebp={bannerBgW} src={bannerBg}/>
                        <h1>Welcome</h1>
                        <h1>{intl.get("samp.policyEngine.nasClients.title")}</h1>
                    </li>
                    <li className="Main">
                        {this.state.loggedIn && <form className="Logout" onSubmit={this.logout}>
                            {this.getGreeting()} <Button variant="link"
                                                         onClick={this.logout}>Logout</Button>
                        </form>}
                        {!this.state.loggedIn && <form className="Login" onSubmit={this.login}>
                            <Row>
                                <Col xs={9}>
                                    <Form.Group id="loginForm" className="FormGroupUsername"
                                                controlId="formUsername">
                                        <Form.Control type="username" onChange={this.onUsernameChange}
                                                      placeholder="Username/Guest code" tabIndex="1"
                                                      onKeyUp={this.onKeyup} onKeyDown={this.onKeydown}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={2}>
                                    <Button variant="primary" onClick={this.login}>Go</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    {this.state.showPasswordField &&
                                    <Form.Group className="FormGroupPassword" controlId="formPassword">
                                        <Form.Control type="password" onChange={this.onPasswordChange}
                                                      placeholder="Password" tabIndex="2"
                                                      onKeyUp={this.onKeyup} onKeyDown={this.onKeydown}/>
                                    </Form.Group>}
                                </Col>
                            </Row>
                            {this.state.logInError !== "" && <Row>
                                <Col xs={9}>
                                    <p className="LoginError">{this.state.logInError}</p>
                                </Col>
                            </Row>}
                        </form>}
                        <Dashboard history={this.props.history}/>
                    </li>
                    <li className="Footer">
                        <a className="Footer" align="right" href="http://www.beian.miit.gov.cn" target="_blank"
                           rel="noopener noreferrer">互联网ICP备案号: 京ICP备20008547号-2</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Home;
