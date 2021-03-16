import React from 'react';

import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import imgCovid19 from './../images/covid19_banner.jpg';
import imgBlog from './../images/blog_banner.jpg';
import imgAdmin from './../images/admin_banner.jpg';
import imgPhoto from './../images/photo_banner.jpg';
import imgECommerce from './../images/ecommerce_banner.jpg';
import imgCv from './../images/cv_banner.jpg';
import imgGtd from './../images/gtd_banner.jpg';
import imgLogs from './../images/logs_banner.jpg';
import imgGraph from './../images/graph_banner.png';

import DashboardCard from "./DashboardCard";
import DashboardCardCovid19 from "./DashboardCardCovid19";

// Back-end api is too slow,
// so for sake of smoother user experience config the dashboard from front-end.
const dataDashboard = [
    {
        data: {
            image: imgCovid19,
            title: "COVID-19",
            dynamicContent: "covid19",
            enabled: false,
            actionButton: "Details"
        }
    },
    {
        data: {
            image: imgAdmin,
            title: "Administration",
            content: "In construction...",
            enabled: false,
            actionButton: "Details"
        }
    },
    // {
    //     data: {
    //         image: imgECommerce,
    //         title: "E-Commerce Catalogs",
    //         content: "Coming soon...",
    //         enabled: false,
    //         actionButton: "Details"
    //     }
    // },
    {
        data: {
            image: imgPhoto,
            title: "Photo gallery",
            content: "Coming soon...",
            enabled: false,
            actionButton: "Details"
        }
    },
    {
        data: {
            image: imgBlog,
            title: "Blog",
            content: "Coming soon...",
            enabled: true,
            actionPath: "/blog",
            actionButton: "Details"
        }
    },
    {
        data: {
            image: imgCv,
            title: "Resume",
            content: "Coming soon...",
            enabled: false,
            actionButton: "Details"
        }
    },
    {
        data: {
            image: imgGtd,
            title: "To-Do",
            content: "Coming soon...",
            enabled: false,
            actionButton: "Details"
        }
    },
    {
        data: {
            image: imgLogs,
            title: "System Logs",
            content: "In construction...",
            enabled: false,
            actionButton: "Details"
        }
    },
    {
        data: {
            image: imgGraph,
            title: "Knowledge graph",
            content: "Coming soon...",
            enabled: false,
            actionButton: "Details"
        }
    }
]

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="Dashboard">
                {dataDashboard.map((item) => (
                    <li key={item.data.title}>
                        {item.data.dynamicContent == "covid19" && <DashboardCardCovid19 data={item.data}/>}
                        {item.data.dynamicContent != "covid19" && <DashboardCard data={item.data}/>}
                    </li>
                ))}
            </ul>
        );
    }
}

export default Dashboard;
