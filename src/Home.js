import React from 'react';
import bannerBg from './images/space.jpg';
import bannerBgW from './images/space.webp';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Card, Col, Row} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import ImageWebp from './components/ImageWebp/ImageWebp';
import Dashboard from "./Dashboard";
import {md5} from './utils/md5'
import {signature} from './utils/SignUtils'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            loggedInUser: "",
            logInError: "",
            username: "",
            password: ""
        }
        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    onUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    login() {
        const userName = this.state.username
        const passwordHash = md5(this.state.password).toUpperCase()
        let argsObj = {
            userName: userName,
            passwordHash: passwordHash
        }
        const args = JSON.stringify(argsObj)
        const sign = signature(args, window.tmpToken)

        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(window.baseUrlAuth + "/auth/login.do?"
            + "userName=" + userName
            + "&passwordHash=" + passwordHash
            + "&sign=" + sign, requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    const code = result['code']
                    if (code == 200) {
                        this.setState({
                            loggedIn: true,
                            loggedInUser: this.state.username,
                            username: "",
                            password: ""
                        })
                        window.token = result['data']['token']
                    } else {
                        this.setState({
                            loggedIn: false,
                            logInError: result['msg']
                        })
                        window.token = ""
                    }
                }
            )
            .catch(error => {
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
        window.token = ""
        this.render()
    }

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
                    </li>
                    <li className="Main">
                        {this.state.loggedIn && <form className="Logout" onSubmit={this.logout}>
                            Hello {this.state.loggedInUser} <Button variant="link" onClick={this.logout}>Logout</Button>
                        </form>}
                        {!this.state.loggedIn && <form className="Login" onSubmit={this.login}>
                            <Row>
                                <Col xs={9}>
                                    <Form.Group className="FormGroupUsername" controlId="formUsername">
                                        <Form.Control type="username" onChange={this.onUsernameChange}
                                                      placeholder="Username/Guest code"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={2}>
                                    <Button variant="primary" onClick={this.login}>Go</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Form.Group className="FormGroupPassword" controlId="formPassword">
                                        <Form.Control type="password" onChange={this.onPasswordChange}
                                                      placeholder="Password"/>
                                    </Form.Group>
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
                           rel="noopener noreferrer">互联网ICP备案号: 京ICP备20008547号-1</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Home;
