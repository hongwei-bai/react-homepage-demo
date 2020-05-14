import React from 'react';

import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Card} from 'react-bootstrap';

import imgCovid19 from './images/covid-19-coronavirus-epidemic-wuhan-2019-ncov.jpg';
import imgExercise from './images/man-running.jpg';
import imgFlight from './images/boeing-737-cockpit.jpg';

import Cookies from 'universal-cookie';

const dataDashboard = {
    covid19: {image: imgCovid19, title: "Coronavirus(COVID-19)"},
    exercise: {image: imgExercise, title: "Exercise"},
    flightsim: {image: imgFlight, title: "Flight Simulation"}
};

const cookies = new Cookies();

const flightUpdate = [
    "CYCLE 1801", <br/>,
    "ADEP ", <a href="https://www.crc.id.au/xplane/charts/DAPS-2020-FEB-27/Canberra%20(YSCB).pdf">YSCB🔗</a>, <br/>,
    "DEPRWY RW35", <br/>,
    "SID CULIN9", <br/>,
    "ADES ",
    <a href="https://www.crc.id.au/xplane/charts/DAPS-2020-FEB-27/Sydney%20Kingsford%20Smith%20(YSSY).pdf">YSSY🔗</a>,
    <br/>,
    "DESRWY RW07", <br/>,
    "STAR ODALE6"
]

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
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
                },
                Denmark: {
                    NewConfirmed: 0,
                    NewDeaths: 0,
                    Confirmed: 0,
                    Deaths: 0,
                    Tests: 0
                },
                Japan: {
                    NewConfirmed: 0,
                    NewDeaths: 0,
                    Confirmed: 0,
                    Deaths: 0,
                    Tests: 0
                },
                US: {
                    NewConfirmed: 0,
                    NewDeaths: 0,
                    Confirmed: 0,
                    Deaths: 0,
                    Tests: 0
                },
                Italy: {
                    NewConfirmed: 0,
                    NewDeaths: 0,
                    Confirmed: 0,
                    Deaths: 0,
                    Tests: 0
                },
                Singapore: {
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

        fetch("http://hongwei-test.top/hongwei-homepage-service/covid19/querybystate.do?days=1", requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    AuDate = result['ausDataByStatePerDays'][0]['date'];
                    AuTime = result['ausDataByStatePerDays'][0]['timeFrom'];
                    NSWCases = result['ausDataByStatePerDays'][0]['NSW'];
                    VICCases = result['ausDataByStatePerDays'][0]['VIC'];
                    this.fetchWorld(AuDate, AuTime, NSWCases, VICCases)
                }
            )
            .catch(error => {
                console.log('error', error)
                this.fetchWorld("API not available!", "", 0, 0)
            });
    }

    fetchWorld(lAuDate, lAuTime, lNSWCases, lVICCases) {
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
                    let dataDenmark = result.filter(item => item['country'] === 'Denmark')[0]
                    let dataJapan = result.filter(item => item['country'] === 'Japan')[0]
                    let dataUS = result.filter(item => item['country'] === 'USA')[0]
                    let dataItaly = result.filter(item => item['country'] === 'Italy')[0]
                    let dataSingapore = result.filter(item => item['country'] === 'Singapore')[0]
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
                        Denmark: {
                            NewConfirmed: dataDenmark['todayCases'],
                            NewDeaths: dataDenmark['todayDeaths'],
                            Confirmed: dataDenmark['cases'],
                            Deaths: dataDenmark['deaths'],
                            Tests: dataDenmark['tests']
                        },
                        Japan: {
                            NewConfirmed: dataJapan['todayCases'],
                            NewDeaths: dataJapan['todayDeaths'],
                            Confirmed: dataJapan['cases'],
                            Deaths: dataJapan['deaths'],
                            Tests: dataJapan['tests']
                        },
                        US: {
                            NewConfirmed: dataUS['todayCases'],
                            NewDeaths: dataUS['todayDeaths'],
                            Confirmed: dataUS['cases'],
                            Deaths: dataUS['deaths'],
                            Tests: dataUS['tests']
                        },
                        Italy: {
                            NewConfirmed: dataItaly['todayCases'],
                            NewDeaths: dataItaly['todayDeaths'],
                            Confirmed: dataItaly['cases'],
                            Deaths: dataItaly['deaths'],
                            Tests: dataItaly['tests']
                        },
                        Singapore: {
                            NewConfirmed: dataSingapore['todayCases'],
                            NewDeaths: dataSingapore['todayDeaths'],
                            Confirmed: dataSingapore['cases'],
                            Deaths: dataSingapore['deaths'],
                            Tests: dataSingapore['tests']
                        }
                    }
                    this.setState({loaded: true})
                    this.setState({dataCovid19: data});
                    this.render();
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
                                <Button variant="primary">Details</Button>
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
                            <Card.Img variant="top" src={dataDashboard.exercise.image}/>
                            <Card.Body>
                                <Card.Title>{dataDashboard.exercise.title}</Card.Title>
                                <Card.Text>
                                    No data!
                                </Card.Text>
                                <Button variant="primary">Details</Button>
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
                            <Card.Img variant="top" src={dataDashboard.flightsim.image}/>
                            <Card.Body>
                                <Card.Title>{dataDashboard.flightsim.title}</Card.Title>
                                <Card.Text>
                                    {flightUpdate}
                                </Card.Text>
                                <Button variant="primary">Details</Button>
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
                                <p>
                                    +Cases/+Deaths/Cases/Deaths/Tests
                                </p>
                                <p className="Covid19Data">
                                    Australia:
                                    <span className="Today">+{this.state.dataCovid19.Australia.NewConfirmed}/+
                                        {this.state.dataCovid19.Australia.NewDeaths}</span>/
                                    {this.state.dataCovid19.Australia.Confirmed}/
                                    {this.state.dataCovid19.Australia.Deaths}/
                                    <span className="Test">{this.state.dataCovid19.Australia.Tests}</span>
                                    <br/>
                                    <nbsp/>
                                    -
                                    NSW:{NSWStr} {byStateCaption}<br/>
                                    <nbsp/>
                                    - Victoria:{VICStr}<br/>
                                    China:
                                    <span className="Today">+{this.state.dataCovid19.China.NewConfirmed}/+
                                        {this.state.dataCovid19.China.NewDeaths}</span>/
                                    {this.state.dataCovid19.China.Confirmed}/
                                    {this.state.dataCovid19.China.Deaths}/
                                    <span className="Test">{this.state.dataCovid19.China.Tests}</span>
                                    <br/>
                                    Denmark:
                                    <span className="Today">+{this.state.dataCovid19.Denmark.NewConfirmed}/+
                                        {this.state.dataCovid19.Denmark.NewDeaths}</span>/
                                    {this.state.dataCovid19.Denmark.Confirmed}/
                                    {this.state.dataCovid19.Denmark.Deaths}/
                                    <span className="Test">{this.state.dataCovid19.Denmark.Tests}</span>
                                    <br/>
                                    Japan:
                                    <span className="Today">+{this.state.dataCovid19.Japan.NewConfirmed}/+
                                        {this.state.dataCovid19.Japan.NewDeaths}</span>/
                                    {this.state.dataCovid19.Japan.Confirmed}/
                                    {this.state.dataCovid19.Japan.Deaths}/
                                    <span className="Test">{this.state.dataCovid19.Japan.Tests}</span>
                                    <br/>
                                    US:
                                    <span className="Today">+{this.state.dataCovid19.US.NewConfirmed}/+
                                        {this.state.dataCovid19.US.NewDeaths}</span>/
                                    {this.state.dataCovid19.US.Confirmed}/
                                    {this.state.dataCovid19.US.Deaths}/
                                    <span className="Test">{this.state.dataCovid19.US.Tests}</span>
                                    <br/>
                                    Italy:
                                    <span className="Today">+{this.state.dataCovid19.Italy.NewConfirmed}/+
                                        {this.state.dataCovid19.Italy.NewDeaths}</span>/
                                    {this.state.dataCovid19.Italy.Confirmed}/
                                    {this.state.dataCovid19.Italy.Deaths}/
                                    <span className="Test">{this.state.dataCovid19.Italy.Tests}</span>
                                    <br/>
                                    Singapore:
                                    <span className="Today">+{this.state.dataCovid19.Singapore.NewConfirmed}/+
                                        {this.state.dataCovid19.Singapore.NewDeaths}</span>/
                                    {this.state.dataCovid19.Singapore.Confirmed}/
                                    {this.state.dataCovid19.Singapore.Deaths}/
                                    <span className="Test">{this.state.dataCovid19.Singapore.Tests}</span>
                                    <br/>
                                </p>
                            </Card.Text>
                            <Button variant="primary">Details</Button>
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
                        <Card.Img variant="top" src={dataDashboard.exercise.image}/>
                        <Card.Body>
                            <Card.Title>{dataDashboard.exercise.title}</Card.Title>
                            <Card.Text>
                                No data!
                            </Card.Text>
                            <Button variant="primary">Details</Button>
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
                        <Card.Img variant="top" src={dataDashboard.flightsim.image}/>
                        <Card.Body>
                            <Card.Title>{dataDashboard.flightsim.title}</Card.Title>
                            <Card.Text>
                                {flightUpdate}
                            </Card.Text>
                            <Button variant="primary">Details</Button>
                        </Card.Body>
                    </Card>
                </li>
            </ul>
        );
    }
}

export default Dashboard;
