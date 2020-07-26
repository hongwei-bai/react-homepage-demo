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
    }

    login() {
        let username = 
        console.log("login run!")
    }

    logout() {
        console.log("logout run!")
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
                        <Form className="Logout">
                            Hello admin <Button variant="link" onClick={this.logout}>Logout</Button>
                        </Form>
                        <Form className="Login">
                            <Row>
                                <Col xs={9}>
                                    <Form.Group className="FormGroupUsername" controlId="formUsername">
                                        <Form.Control type="username" placeholder="Username/Guest code"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={2}>
                                    <Button variant="primary" onClick={this.login}>Go</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={9}>
                                    <Form.Group className="FormGroupUsername" controlId="formUsername">
                                        <Form.Control type="password" placeholder="Password"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
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
