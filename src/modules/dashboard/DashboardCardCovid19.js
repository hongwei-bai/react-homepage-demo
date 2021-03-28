import React from 'react';

import './DashboardCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class DashboardCardCovid19 extends React.Component {
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

    render() {
        let NSWStr = this.state.dataCovid19.Australia.NSW
        let VICStr = this.state.dataCovid19.Australia.VIC
        if (this.state.dataCovid19.Australia.Time === "") {
            NSWStr = "-"
            VICStr = "-"
        }
        let loadAgainCation = ""
        if (!this.state.isNew) {
            loadAgainCation = " (cache)"
        }
        return (
            <Card style={{
                width: '18rem',
                height: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '0.1em',
                marginBottom: '0.1em'
            }}>
                <div className="CardInner">
                    <Card.Img variant="top" src={this.props.data.image}/>
                    <Card.Body>
                        <Card.Title>{this.props.data.title}</Card.Title>
                        <Covid19Content
                            loaded={this.state.loaded}
                            dataCovid19={this.state.dataCovid19}
                            NSWStr={NSWStr}
                            loadAgainCation={loadAgainCation}
                            VICStr={VICStr}/>
                        <Button variant="primary" disabled>Details</Button>
                    </Card.Body>
                </div>
            </Card>
        )
    }

    componentDidMount() {
        this.getSummary();
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
}

function Covid19Content(props) {
    if (props.loaded) {
        return (
            <Card.Text>
                                <span>
                                    +Cases/+Deaths/Cases/Deaths/Tests<br/>
                                </span>
                <span className="Covid19Data">
                                    Australia:
                                    <span className="Today">+{props.dataCovid19.Australia.NewConfirmed}/+
                                        {props.dataCovid19.Australia.NewDeaths}</span>/
                    {props.dataCovid19.Australia.Confirmed}/
                    {props.dataCovid19.Australia.Deaths}/
                                    <span className="Test">{props.dataCovid19.Australia.Tests}</span>
                                    <br/>
                                    - NSW:{props.NSWStr} {props.loadAgainCation}<br/>
                                    - Victoria:{props.VICStr}<br/>
                                    China:
                                    <span className="Today">+{props.dataCovid19.China.NewConfirmed}/+
                                        {props.dataCovid19.China.NewDeaths}</span>/
                    {props.dataCovid19.China.Confirmed}/
                    {props.dataCovid19.China.Deaths}/
                                    <span className="Test">{props.dataCovid19.China.Tests}</span>
                                    <br/>
                                </span>
            </Card.Text>
        )
    } else {
        return <Card.Text>
            Loading...
        </Card.Text>
    }
}

export default withRouter(DashboardCardCovid19);
