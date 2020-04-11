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
    "FLPN: YSCB/YSSY", <br/>,
    "CULIN9 CULIN Y59 RIVET RIVET3", <br/>,
    "RTE: TARAL, FL200", <br/>,
    "Fuel: 5128 Kgs/11305.3 lbs", <br/>,
    "ILS: 109.50/155°", <br/>
]

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCovid19: {
                Australia: {
                    NewConfirmed: 0,
                    NewDeaths: 0,
                    NewRecovered: 0
                },
                China: {
                    NewConfirmed: 0,
                    NewDeaths: 0,
                    NewRecovered: 0
                },
            },
        }
    }

    getSummary() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://api.covid19api.com/summary", requestOptions)
            .then(response => response.json())
            .then(
                result => {
                    let dataAustralia = result['Countries'].filter(item => item['Country'] === 'Australia')[0]
                    let dataChina = result['Countries'].filter(item => item['Country'] === 'China')[0]
                    let data = {
                        Australia: {
                            NewConfirmed: dataAustralia['NewConfirmed'],
                            NewDeaths: dataAustralia['NewDeaths'],
                            NewRecovered: dataAustralia['NewRecovered']
                        },
                        China: {
                            NewConfirmed: dataChina['NewConfirmed'],
                            NewDeaths: dataChina['NewDeaths'],
                            NewRecovered: dataChina['NewRecovered']
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
                                    New/Confirmed/Death/Recovered
                                </p>
                                <p>
                                    Australia:
                                    {this.state.dataCovid19.Australia.NewConfirmed}/
                                    {this.state.dataCovid19.Australia.NewDeaths}/
                                    {this.state.dataCovid19.Australia.NewRecovered}
                                </p>
                                <p>
                                    China:
                                    {this.state.dataCovid19.China.NewConfirmed}/
                                    {this.state.dataCovid19.China.NewDeaths}/
                                    {this.state.dataCovid19.China.NewRecovered}
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
