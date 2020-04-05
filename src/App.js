import React from 'react';
import bannerBg from './images/space.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button} from 'react-bootstrap';
import Form from "react-bootstrap/Form";

function App() {
    return (
        <div className="App">
            <link rel="stylesheet"
                  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <link href="https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&display=swap" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Abel&display=swap" rel="stylesheet"/>
            <ul>
                <li className="Banner">
                    <img src={bannerBg} alt="banner"
                         style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', zIndex: '-2'}}/>
                    <h1>Welcome</h1>
                </li>
                <li className="Main">
                    <Form className="Login">
                        <Form.Group className="FormGroupUsername" controlId="formUsername">
                            <Form.Control type="username" placeholder="Username/Guest code"/>
                            <Button variant="primary" type="submit">Go</Button>
                        </Form.Group>
                    </Form>
                </li>
                <li className="Footer">
                    <a align="right" href="http://www.beian.miit.gov.cn" target="_blank"
                       rel="noopener noreferrer">互联网ICP备案号: 京ICP备20008547号-1</a>
                </li>
            </ul>
        </div>
    );
}

export default App;
