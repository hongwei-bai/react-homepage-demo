import React from 'react';

import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import DashboardCard from "./DashboardCard";
import DashboardCardCovid19 from "./DashboardCardCovid19";
import {localesStore} from "../../reducers/store"
import {
    adminData,
    blogData,
    cvData,
    dataCovid19,
    eCommerceData, knowledgeData,
    logData,
    photoData,
    toDoData, uploadExerciseData
} from "./DashboardCardData";
import {getDashboardEntries, isAdmin} from "../../services/PricilegeService";

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
        let cardsWithAccess = []
        cardsWithAccess.push(dataCovid19())

        if (isAdmin()) {
            cardsWithAccess.push(adminData())
            cardsWithAccess.push(logData())
        } else {
            getDashboardEntries().forEach((access) => {
                switch (access.toLowerCase()) {
                    case "blog":
                        cardsWithAccess.push(blogData())
                        break;
                    case "knowledgegraph":
                        cardsWithAccess.push(knowledgeData())
                        break;
                    case "ecommerce":
                        cardsWithAccess.push(eCommerceData())
                        break;
                    case "photo":
                        cardsWithAccess.push(photoData())
                        break;
                    case "resume":
                        cardsWithAccess.push(cvData())
                        break;
                    case "todo":
                        cardsWithAccess.push(toDoData())
                        break;
                    case "uploadExercise":
                        cardsWithAccess.push(uploadExerciseData())
                        break;
                    default:
                        break
                }
            })
        }
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
