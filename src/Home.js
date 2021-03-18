import React from 'react';
import bannerBg from './images/space.jpg';
import bannerBgW from './images/space.webp';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Card, Col, Row} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import ImageWebp from './components/ImageWebp/ImageWebp';
import Dashboard from "./dashboard/Dashboard";
import {md5} from './utils/md5'
import intl from 'react-intl-universal';
import locales from './multi-lang/Locale'
import {Provider} from "react-redux";
import {createStore} from 'redux';

const store = createStore(todos, ['Use Redux']);

function todos(state = [], action) {
    switch (action.type) {
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            antdLang: locales.en_US,  // 修改antd  组件的国际化
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

        if (this.isValidGuestCode(event.target.value)) {
            this.setState({
                showPasswordField: false
            })
        } else {
            this.setState({
                showPasswordField: true
            })
        }
    }

    //e.g. g:wq7CjbYja
    // Assume a standard guest code starts with 'g:' and has length of 10.
    // Don't show password field if user type guest code from 'g:xx'.
    isValidGuestCode(str) {
        if (str.startsWith("g") && str.length === 1) {
            return true
        } else if (str.startsWith("g:") && str.length <= 10) {
            return true
        }

        return false
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    login() {
        const userName = this.state.username
        let userCredentials
        if (userName.startsWith("g:")) {
            userCredentials = {
                guestCode: userName
            }
        } else {
            userCredentials = {
                userName: userName,
                credential: md5(this.state.password).toUpperCase()
            }
        }

        fetch(window.baseUrlAuth + "/authenticate.do", {
            method: 'POST',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(userCredentials) // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then(
                result => {
                    const jwt = result['jwt']
                    if (jwt != null) {
                        this.writeCredentials(userName, jwt)
                        this.setState({
                            loggedIn: true,
                            loggedInUser: userName,
                            username: "",
                            password: ""
                        })
                    } else {
                        this.clearCredentials()
                        this.setState({
                            loggedIn: false,
                            logInError: 'Log in failed.'
                        })
                    }
                }
            )
            .catch(error => {
                this.clearCredentials()
                console.log('error', error)
            });
    }

    logout() {
        this.setState({
            loggedIn: false,
            loggedInUser: "",
            logInError: "",
            username: "",
            password: ""
        })
        this.clearCredentials()
        this.render()
    }

    loadLocales(lang = 'en-US') {
        intl.init({
            currentLocale: lang,  // 设置初始语音
            locales,
        }).then(() => {
            this.setState({
                antdLang: lang === 'zh-CN' ? locales.zh_CN : locales.en_US
            });
        });
    }

    componentDidMount() {
        this.refreshLoginStatus();
    }

    refreshLoginStatus() {
        let [user, jwt] = this.readCredentials()
        if (user != null && user.length > 0
            && jwt != null && jwt.length > 0) {
            this.setState({
                loggedIn: true,
                loggedInUser: user
            })
        } else {
            this.setState({
                loggedIn: false
            })
        }
    }

    clearCredentials() {
        this.setCookie("user", "", 1)
        this.setCookie("jwt", "", 1)
    }

    writeCredentials(user, jwt) {
        this.setCookie("user", user, 7)
        this.setCookie("jwt", jwt, 7)
    }

    readCredentials() {
        console.log("cookie:" + document.cookie)
        return [this.getCookie("user"), this.getCookie("jwt")]
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    getGreeting() {
        if (this.state.loggedInUser.startsWith("g:")) {
            return "Hello guest "
        } else {
            return "Hello " + this.state.loggedInUser
        }
    }

    render() {
        return (
            <Provider store={store} locale={this.state.antdLang}>
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
                                {this.state.logInError != "" && <Row>
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
            </Provider>
        )
    }
}

export default Home;
