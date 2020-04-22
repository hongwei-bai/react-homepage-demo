import React from 'react';
import bannerBg from './images/space.jpg';
import bannerBgW from './images/space.webp';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Card} from 'react-bootstrap';
import Form from "react-bootstrap/Form";
import ImageWebp from './components/ImageWebp/ImageWebp';
import Dashboard from "./Dashboard";

import imgConv19 from './images/covid-19-coronavirus-epidemic-wuhan-2019-ncov.jpg';
import imgExercise from './images/man-running.jpg';
import imgFlight from './images/boeing-737-cockpit.jpg';

function Home() {
    const dataDashboard = [
        {image: imgConv19, title: "Coronavirus(COVID-19)", update: "Australia: No data!"},
        {image: imgExercise, title: "Exercise", update: "Walk today: 2669"},
        {image: imgFlight, title: "Flight Simulation", update: ""}
    ];

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
                    <Form className="Login">
                        <Form.Group className="FormGroupUsername" controlId="formUsername">
                            <Form.Control type="username" placeholder="Username/Guest code"/>
                            <Button variant="primary" type="submit">Go</Button>
                        </Form.Group>
                    </Form>
                    <Dashboard data={dataDashboard}/>
                </li>
                <li className="Footer">
                    <a className="Footer" align="right" href="http://www.beian.miit.gov.cn" target="_blank"
                       rel="noopener noreferrer">互联网ICP备案号: 京ICP备20008547号-1</a>
                </li>
            </ul>
        </div>
    )
        ;
}

export default Home;
