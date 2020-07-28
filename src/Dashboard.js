import React from 'react';

import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Card} from 'react-bootstrap';

import imgCovid19 from './images/covid19_banner.jpg';
import imgBlog from './images/blog_banner.jpg';
import imgAdmin from './images/admin_banner.jpg';
import imgPhoto from './images/photo_banner.jpg';
import imgECommerce from './images/ecommerce_banner.jpg';

import Cookies from 'universal-cookie';

const dataDashboard = {
    covid19: {image: imgCovid19, title: "COVID-19"},
    // exercise: {image: imgExercise, title: "Exercise"},
    // flightsim: {image: imgFlight, title: "Flight Simulation"},
    admin: {image: imgAdmin, title: "Administration"},
    ecommerce: {image: imgECommerce, title: "E-Commerce Catalogs"},
    photo: {image: imgPhoto, title: "Photo gallery"},
    blog: {image: imgBlog, title: "BLOG"}
};

const cookies = new Cookies();

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            isNew: false,
            dataCovid19: {
                Australia: {
                    NewConfirmed: 0,
                    NewDeaths: 0,
                    Confirmed: 0,
                    Deaths: 0,
                    Tests: 0,
                    Date: "",
                    Time: "",
                    NSW: 0,
                    VIC: 0
                },
                China: {
                    NewConfirmed: 0,
                    NewDeaths: 0,
                    Confirmed: 0,
                    Deaths: 0,
                    Tests: 0
                }
            },
        }
    }

    getSummary() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        this.setState({loaded: false})
        let AuDate = "";
        let AuTime = "";
        let NSWCases = 0;
        let VICCases = 0;

        fetch(window.baseUrl + "/covid19/querybystate.do?days=1", requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    AuDate = result['ausDataByStatePerDays'][0]['date'];
                    AuTime = result['ausDataByStatePerDays'][0]['timeFrom'];
                    NSWCases = result['ausDataByStatePerDays'][0]['NSW'];
                    VICCases = result['ausDataByStatePerDays'][0]['VIC'];
                    this.fetchWorld(AuDate, AuTime, NSWCases, VICCases, result['isNewData'])
                }
            )
            .catch(error => {
                console.log('error', error)
                this.fetchWorld("API not available!", "", 0, 0, true)
            });
    }

    fetchWorld(lAuDate, lAuTime, lNSWCases, lVICCases, isNew) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("https://corona.lmao.ninja/v2/countries?sort=country", requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    let dataAustralia = result.filter(item => item['country'] === 'Australia')[0]
                    let dataChina = result.filter(item => item['country'] === 'China')[0]
                    let data = {
                        Australia: {
                            NewConfirmed: dataAustralia['todayCases'],
                            NewDeaths: dataAustralia['todayDeaths'],
                            Confirmed: dataAustralia['cases'],
                            Deaths: dataAustralia['deaths'],
                            Tests: dataAustralia['tests'],
                            Date: lAuDate,
                            Time: lAuTime,
                            NSW: lNSWCases,
                            VIC: lVICCases
                        },
                        China: {
                            NewConfirmed: dataChina['todayCases'],
                            NewDeaths: dataChina['todayDeaths'],
                            Confirmed: dataChina['cases'],
                            Deaths: dataChina['deaths'],
                            Tests: dataChina['tests']
                        },
                    }
                    this.setState({loaded: true})
                    this.setState({dataCovid19: data});
                    this.render();

                    this.setState({isNew: isNew})
                    if (!isNew) {
                        const timer = setTimeout(() => {
                            this.getSummary()
                            clearTimeout(timer);
                        }, 5000);
                    }
                }
            )
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
        // cookies.set('myCat', 'Pacman', { path: '/' });
        console.log(cookies.get('myCat')); // Pacman

        this.getSummary();
    }

    render() {
        if (!this.state.loaded) {
            return (
                <ul className="Dashboard">
                    <li>
                        <Card style={{
                            width: '18rem',
                            height: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '0.1em',
                            marginBottom: '0.1em'
                        }}>
                            <Card.Img variant="top" src={dataDashboard.covid19.image}/>
                            <Card.Body>
                                <Card.Title>{dataDashboard.covid19.title}</Card.Title>
                                <Card.Text>
                                    Loading...
                                </Card.Text>
                                <Button variant="primary" disabled>Details</Button>
                            </Card.Body>
                        </Card>
                    </li>

                    <li>
                        <Card style={{
                            width: '18rem',
                            height: '100%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '0.1em',
                            marginBottom: '0.1em'
                        }}>
                            <Card.Img variant="top" src={dataDashboard.blog.image}/>
                            <Card.Body>
                                <Card.Title>{dataDashboard.blog.title}</Card.Title>
                                <Card.Text>
                                    Basic functions are in alpha test.
                                </Card.Text>
                                <Button variant="primary" onClick={() => thisPtr.redirectToBlog()}>Details</Button>
                            </Card.Body>
                        </Card>
                    </li>
                </ul>
            )
        }
        let NSWStr = this.state.dataCovid19.Australia.NSW
        let VICStr = this.state.dataCovid19.Australia.VIC
        let byStateCaption = "(by " + this.state.dataCovid19.Australia.Date + " " + this.state.dataCovid19.Australia.Time + ")"
        if (this.state.dataCovid19.Australia.Time == "") {
            NSWStr = "-"
            VICStr = "-"
            byStateCaption = ""
        }
        let loadAgainCation = ""
        if (!this.state.isNew) {
            loadAgainCation = " (cache)"
        }
        const thisPtr = this
        return (
            <ul className="Dashboard">
                <li>
                    <Card style={{
                        width: '18rem',
                        height: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '0.1em',
                        marginBottom: '0.1em'
                    }}>
                        <Card.Img variant="top" src={dataDashboard.covid19.image}/>
                        <Card.Body>
                            <Card.Title>{dataDashboard.covid19.title}</Card.Title>
                            <Card.Text>
                                <span>
                                    +Cases/+Deaths/Cases/Deaths/Tests<br/>
                                </span>
                                <span className="Covid19Data">
                                    Australia:
                                    <span className="Today">+{this.state.dataCovid19.Australia.NewConfirmed}/+
                                        {this.state.dataCovid19.Australia.NewDeaths}</span>/
                                    {this.state.dataCovid19.Australia.Confirmed}/
                                    {this.state.dataCovid19.Australia.Deaths}/
                                    <span className="Test">{this.state.dataCovid19.Australia.Tests}</span>
                                    <br/>
                                    - NSW:{NSWStr} {loadAgainCation}<br/>
                                    - Victoria:{VICStr}<br/>
                                    China:
                                    <span className="Today">+{this.state.dataCovid19.China.NewConfirmed}/+
                                        {this.state.dataCovid19.China.NewDeaths}</span>/
                                    {this.state.dataCovid19.China.Confirmed}/
                                    {this.state.dataCovid19.China.Deaths}/
                                    <span className="Test">{this.state.dataCovid19.China.Tests}</span>
                                    <br/>
                                </span>
                            </Card.Text>
                            <Button variant="primary" disabled>Details</Button>
                        </Card.Body>
                    </Card>
                </li>
                <li>
                    <Card style={{
                        width: '18rem',
                        height: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '0.1em',
                        marginBottom: '0.1em'
                    }}>
                        <Card.Img variant="top" src={dataDashboard.admin.image}/>
                        <Card.Body>
                            <Card.Title>{dataDashboard.admin.title}</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            <Button variant="primary" onClick={() => thisPtr.redirectToBlog()}>Details</Button>
                        </Card.Body>
                    </Card>
                </li>
                <li>
                    <Card style={{
                        width: '18rem',
                        height: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '0.1em',
                        marginBottom: '0.1em'
                    }}>
                        <Card.Img variant="top" src={dataDashboard.ecommerce.image}/>
                        <Card.Body>
                            <Card.Title>{dataDashboard.ecommerce.title}</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            <Button variant="primary" onClick={() => thisPtr.redirectToBlog()}>Details</Button>
                        </Card.Body>
                    </Card>
                </li>
                <li>
                    <Card style={{
                        width: '18rem',
                        height: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '0.1em',
                        marginBottom: '0.1em'
                    }}>
                        <Card.Img variant="top" src={dataDashboard.photo.image}/>
                        <Card.Body>
                            <Card.Title>{dataDashboard.photo.title}</Card.Title>
                            <Card.Text>
                            </Card.Text>
                            <Button variant="primary" onClick={() => thisPtr.redirectToBlog()}>Details</Button>
                        </Card.Body>
                    </Card>
                </li>
                <li>
                    <Card style={{
                        width: '18rem',
                        height: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: '0.1em',
                        marginBottom: '0.1em'
                    }}>
                        <Card.Img variant="top" src={dataDashboard.blog.image}/>
                        <Card.Body>
                            <Card.Title>{dataDashboard.blog.title}</Card.Title>
                            <Card.Text>
                                Basic functions are in alpha test.
                            </Card.Text>
                            <Button variant="primary" onClick={() => thisPtr.redirectToBlog()}>Details</Button>
                        </Card.Body>
                    </Card>
                </li>
            </ul>
        );
    }

    redirectToBlog() {
        this.props.history.push("/blog")
    }
}

export default Dashboard;
