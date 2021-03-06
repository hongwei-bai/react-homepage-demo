import React from 'react';

import './DashboardCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import intl from 'react-intl-universal';
import {homePageInstance} from "../../network/AxiosInstances";
import {logInBackgroundStore} from "../../reducers/store";
import {STATUS_REFRESHED} from "../../reducers/LoginBackgroundReducer";

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
            loadAgainCation = " " + intl.get("covid19Cached")
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
                        <Button variant="primary" disabled>{intl.get("details")}</Button>
                    </Card.Body>
                </div>
            </Card>
        )
    }

    componentDidMount() {
        this.getSummary();
        logInBackgroundStore.subscribe(() => {
            if (logInBackgroundStore.getState().refreshTokenStatus === STATUS_REFRESHED) {
                this.getSummary();
            }
        })
    }

    getSummary() {
        this.setState({loaded: false})
        let AuDate = "";
        let AuTime = "";
        let NSWCases = 0;
        let VICCases = 0;

        homePageInstance.get("/covid19/queryByState.do?days=1")
            .then(response => {
                    AuDate = response.data.ausDataByStatePerDays[0].date
                    AuTime = response.data.ausDataByStatePerDays[0].timeFrom
                    NSWCases = response.data.ausDataByStatePerDays[0].nsw
                    VICCases = response.data.ausDataByStatePerDays[0].vic
                    this.fetchWorld(AuDate, AuTime, NSWCases, VICCases, response.data.newData)
                }
            )
            .catch(error => {
                this.fetchWorld(intl.get("covid19LoadError"), "", 0, 0, true)
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
                                    {intl.get("newCases")}/{intl.get("newDeaths")}/{intl.get("totalCases")}/{intl.get("totalDeaths")}/{intl.get("totalTests")}<br/>
                                </span>
                <span className="Covid19Data">
                                    {intl.get("newCasesInAustralia")}:
                                    <span className="Today">+{props.dataCovid19.Australia.NewConfirmed}/+
                                        {props.dataCovid19.Australia.NewDeaths}</span>/
                    {props.dataCovid19.Australia.Confirmed}/
                    {props.dataCovid19.Australia.Deaths}/
                                    <span className="Test">{props.dataCovid19.Australia.Tests}</span>
                                    <br/>
                                    - {intl.get("newCasesInNSW")}:{props.NSWStr} {props.loadAgainCation}<br/>
                                    - {intl.get("newCasesInVictoria")}:{props.VICStr}<br/>
                                    {intl.get("newCasesInChina")}:
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
            {intl.get("covid19Loading")}
        </Card.Text>
    }
}

export default withRouter(DashboardCardCovid19);
