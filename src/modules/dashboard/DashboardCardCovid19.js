import React from 'react';

import './DashboardCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import intl from 'react-intl-universal';
import {homePageInstance} from "../../network/AxiosInstances";
import {logInBackgroundStore} from "../../reducers/store";
import {STATUS_REFRESHED} from "../../reducers/LoginBackgroundReducer";
import {followedPostcodes, followedSuburbs} from "./Covid19FollowedSuburbs";

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
                    NSW: 0,
                    VIC: 0,
                    isTodaysData: false,
                    topSuburbs: [],
                    topFollowedSuburbs: []
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
        let loadAgainCation = ""
        if (!this.state.dataCovid19.Australia.isTodaysData) {
            loadAgainCation = " " + intl.get("covid19Yesterday")
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
                            VICStr={VICStr}
                            isTodaysData={this.state.dataCovid19.Australia.isTodaysData}
                            topSuburbs={this.state.dataCovid19.Australia.topSuburbs}
                            topFollowedSuburbs={this.state.dataCovid19.Australia.topFollowedSuburbs}
                        />
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
        let NSWCases = 0;
        let VICCases = 0;

        homePageInstance.get("/covid19/au.do?days=2&dataVersion=0")
            .then(response => {
                    let dataSize = response.data.dataByDay.size
                    let isTodaysData = dataSize === 1
                    let topSuburbs = response.data.dataByDay[0].caseByPostcode.filter((_, i) => i <= 2)
                    let topFollowedSuburbs = response.data.dataByDay[0].caseByPostcode
                        .filter(item => followedPostcodes.includes(item.postcode))
                        .map(data => ({
                            suburb: this.getFollowedSuburbByPostcode(data.postcode),
                            cases: data.cases
                        }))
                    AuDate = response.data.dataByDay[0].dateDisplay
                    let nswList = response.data.dataByDay[0].caseByState.filter(item => item.stateCode === 'NSW')
                    if (nswList.length > 0) {
                        NSWCases = nswList[0].cases
                    }
                    let vicList = response.data.dataByDay[0].caseByState.filter(item => item.stateCode === 'VIC')
                    if (vicList.length > 0) {
                        VICCases = vicList[0].cases
                    }
                    this.fetchWorld(AuDate, NSWCases, VICCases, isTodaysData, topSuburbs, topFollowedSuburbs)
                }
            )
            .catch(error => {
                this.fetchWorld(intl.get("covid19LoadError"), 0, 0, true)
            });
    }

    getFollowedSuburbByPostcode(postcode) {
        let found = ""
        followedSuburbs.forEach(item => {
            if (item.postcode === postcode) {
                found = item.suburb
            }
        })
        return found
    }

    fetchWorld(lAuDate, lNSWCases, lVICCases, isTodaysData, topSuburbs, topFollowedSuburbs) {
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
                            NSW: lNSWCases,
                            VIC: lVICCases,
                            isTodaysData: isTodaysData,
                            topSuburbs: topSuburbs,
                            topFollowedSuburbs: topFollowedSuburbs
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
                                    - {intl.get("newCasesInNSW")}:+{props.NSWStr} {props.loadAgainCation}<br/>
                                    - {intl.get("newCasesInVictoria")}:+{props.VICStr}<br/>
                                    - {intl.get("topSuburbs")}:<br/>
                                    <TopSuburbsDataToString topSuburbs={props.topSuburbs}/>
                                    - {intl.get("topFollowedSuburbs")}:{topFollowedSuburbsDataToString(props.topFollowedSuburbs)}<br/>
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

function topFollowedSuburbsDataToString(topFollowedSuburbs) {
    let string = ""
    topFollowedSuburbs.forEach((item, i) => {
            string += item.suburb + "(+" + item.cases + ")"
            if (i < topFollowedSuburbs.length - 1) {
                string += ", "
            }
        }
    )
    return string
}

function TopSuburbsDataToString(props) {
    let list = []
    props.topSuburbs.forEach((item, i) => {
            list[i] = " *" + item.postcode + " " + item.suburbBrief + " (+" + item.cases + ")"
        }
    )
    return (
        <ul>
            {list.map((item) => (<li key={item}>{item}</li>))}
        </ul>
    );
}

export default withRouter(DashboardCardCovid19);
