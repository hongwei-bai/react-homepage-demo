import React from 'react';

import './DashboardCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import intl from 'react-intl-universal';
import {covidInstance, homePageInstance} from "../../network/AxiosInstances";
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
                    dataVersion: "N/A",
                    total: 0,
                    NSW: 0,
                    VIC: 0,
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
        let NSWStr = "+" + this.state.dataCovid19.Australia.NSW
        let VICStr = "+" + this.state.dataCovid19.Australia.VIC
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
                            dataVersion={this.state.dataCovid19.Australia.dataVersion}
                            total={this.state.dataCovid19.Australia.total}
                            NSWStr={NSWStr}
                            VICStr={VICStr}
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

    getDateDisplay(dataVersion) {
        let dateString = dataVersion.toString()
        if (dateString.length === 10) {
            let year = dateString.substring(0, 4)
            let month = dateString.substring(4, 6)
            let day = dateString.substring(6, 8)
            return day + "/" + month + "/" + year
        }
        return dateString
    }

    getSummary() {
        this.setState({loaded: false})

        covidInstance.get("/covid-v2/au/raw.do?dataVersion=0&followedSuburbs=" + followedPostcodes.join(","))
            .then(response => {
                    let dataVersion = this.getDateDisplay(response.data.dataVersion)
                    let nswCases = 0
                    let vicCases = 0
                    response.data.stateData.forEach(item => {
                        if (item.state === "Nsw") {
                            nswCases = item.newCases
                        }
                    })
                    response.data.stateData.forEach(item => {
                        if (item.state === "Vic") {
                            vicCases = item.newCases
                        }
                    })
                    let total = response.data.nationData.newCases
                    let topFollowedSuburbs = response.data.lgaData[0].lga
                        .map(data => ({
                            suburb: this.getFollowedSuburbByPostcode(data.postcode),
                            cases: data.cases
                        }))
                    let data = {
                        Australia: {
                            dataVersion: dataVersion,
                            total: total,
                            NSW: nswCases,
                            VIC: vicCases,
                            topFollowedSuburbs: topFollowedSuburbs
                        }
                    }
                    this.setState({loaded: true})
                    this.setState({dataCovid19: data});
                    this.render();
                }
            )
            .catch(error => {
                let data = {
                    Australia: {
                        dateVersion: "N/A",
                        total: 0,
                        NSW: 0,
                        VIC: 0,
                        topFollowedSuburbs: []
                    }
                }
                this.setState({loaded: true})
                this.setState({dataCovid19: data});
                this.render();
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
}

function Covid19Content(props) {
    if (props.loaded) {
        return (
            <Card.Text>
                <span className="Covid19Data">
                                    - {intl.get("newCasesInAustralia")}:+{props.total} ({props.dataVersion})<br/>
                                    - {intl.get("newCasesInNSW")}:{props.NSWStr}<br/>
                                    - {intl.get("newCasesInVictoria")}:{props.VICStr}<br/>
                                    - {intl.get("topFollowedSuburbs")}:{topFollowedSuburbsDataToString(props.topFollowedSuburbs)}<br/>
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
    if (typeof topFollowedSuburbs != "undefined" && topFollowedSuburbs.length > 0) {
        topFollowedSuburbs.forEach((item, i) => {
                string += item.suburb + "(+" + item.cases + ")"
                if (i < topFollowedSuburbs.length - 1) {
                    string += ", "
                }
            }
        )
    }
    return string
}

function TopSuburbsDataToString(props) {
    let list = []
    if (typeof props.topSuburbs != "undefined" && props.topSuburbs.length > 0) {
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
    return (<p>No data</p>)
}

export default withRouter(DashboardCardCovid19);
