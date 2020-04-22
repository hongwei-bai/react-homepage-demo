import React from 'react';

import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button, Card} from 'react-bootstrap';

import imgCovid19 from './images/covid-19-coronavirus-epidemic-wuhan-2019-ncov.jpg';
import imgExercise from './images/man-running.jpg';
import imgFlight from './images/boeing-737-cockpit.jpg';

const dataDashboard = {
    covid19: {image: imgCovid19, title: "Coronavirus(COVID-19)"},
    exercise: {image: imgExercise, title: "Exercise"},
    flightsim: {image: imgFlight, title: "Flight Simulation"}
};

const flightUpdate = [
    "CYCLE 1801", <br/>,
    "ADEP ", <a href="https://www.crc.id.au/xplane/charts/DAPS-2020-FEB-27/Canberra%20(YSCB).pdf">YSCB🔗</a>, <br/>,
    "DEPRWY RW35", <br/>,
    "SID CULIN9", <br/>,
    "ADES ", <a href="https://www.crc.id.au/xplane/charts/DAPS-2020-FEB-27/Sydney%20Kingsford%20Smith%20(YSSY).pdf">YSSY🔗</a>, <br/>,
    "DESRWY RW07", <br/>,
    "STAR ODALE6"
]

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCovid19: {
                Australia: {
                    NewConfirmed: 0,
                    NewDeaths: 0,
                    Confirmed: 0,
                    Deaths: 0,
                    Tests: 0
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
                            Tests: dataAustralia['tests']
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
                    this.setState({dataCovid19: data});
                }
            )
            .catch(error => console.log('error', error));
    }

    componentDidMount() {
        this.getSummary();
    }

    render() {
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
