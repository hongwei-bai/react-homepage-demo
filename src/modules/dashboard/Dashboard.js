import React from 'react';

import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DashboardCard from "./DashboardCard";
import DashboardCardCovid19 from "./DashboardCardCovid19";
import {logInStore, localesStore} from "../../reducers/store"
import {
    adminData,
    blogData,
    cvData,
    dataCovid19,
    eCommerceData, knowledgeData,
    logData,
    photoData,
    toDoData
} from "./DashboardCardData";
import intl from 'react-intl-universal';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        localesStore.subscribe(() => {
            this.loadCards()
        })
    }

    loadCards() {
        const privilege = logInStore.getState().privilege
        let cardsWithAccess = []
        cardsWithAccess.push(dataCovid19())
        if (privilege !== undefined && privilege.blog !== undefined) {
            if (privilege.blog.main === true) {
                cardsWithAccess.push(blogData())
            }
        }
        cardsWithAccess.push(adminData())
        cardsWithAccess.push(eCommerceData())
        cardsWithAccess.push(photoData())
        cardsWithAccess.push(cvData())
        cardsWithAccess.push(toDoData())
        cardsWithAccess.push(logData())
        cardsWithAccess.push(knowledgeData())
        this.setState({
            data: cardsWithAccess
        })
    }

    render() {
        return (
            <ul className="Dashboard">
                {this.state.data.map((item) => (
                    <li key={item.data.title}>
                        {item.data.dynamicContent === "covid19" && <DashboardCardCovid19 data={item.data}/>}
                        {item.data.dynamicContent !== "covid19" && <DashboardCard data={item.data}/>}
                    </li>
                ))}
            </ul>
        );
    }
}

export default Dashboard;
