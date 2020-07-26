import React from 'react';
import bannerBg from './images/space.jpg';
import bannerBgW from './images/space.webp';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Card, Col, Row} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import ImageWebp from './components/ImageWebp/ImageWebp';
import Dashboard from "./Dashboard";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            loggedInUser: "hongwei",
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

    login(event) {
        // alert("submit username: " + this.state.username + "/" + this.state.password)
        // event.preventDefault()
        this.setState({
            loggedIn: true,
            loggedInUser: this.state.username,
            username: "",
            password: ""
        })
    }

    logout() {
        this.setState({
            loggedIn: false,
            loggedInUser: "",
            username: "",
            password: ""
        })
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
                            Hello {this.state.loggedInUser} <Button variant="link" type="submit">Logout</Button>
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
                                    <Button variant="primary" type="submit">Go</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Form.Group className="FormGroupUsername" controlId="formUsername">
                                        <Form.Control type="password" onChange={this.onPasswordChange}
                                                      placeholder="Password"/>
                                    </Form.Group>
                                </Col>
                            </Row>
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
