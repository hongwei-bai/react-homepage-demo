import imgCovid19 from "../../images/covid19_banner.jpg";
import imgBlog from "../../images/blog_banner.jpg";
import imgAdmin from "../../images/admin_banner.jpg";
import imgECommerce from "../../images/ecommerce_banner.jpg";
import imgPhoto from "../../images/photo_banner.jpg";
import imgCv from "../../images/cv_banner.jpg";
import imgGtd from "../../images/gtd_banner.jpg";
import imgLogs from "../../images/logs_banner.jpg";
import imgGraph from "../../images/graph_banner.png";
import intl from 'react-intl-universal';

export const dataCovid19 = {
    data: {
        image: imgCovid19,
        title: "COVID-19",
        dynamicContent: "covid19",
        enabled: false,
        actionButton: "Details"
    }
}

export const blogData = {
    data: {
        image: imgBlog,
        title: intl.get('blog_title'),
        content: "Coming soon...",
        enabled: true,
        actionPath: "/blog",
        actionButton: "Details"
    }
}

export const adminData = {
    data: {
        image: imgAdmin,
        title: "Administration",
        content: "In construction...",
        enabled: false,
        actionButton: "Details"
    }
}

export const eCommerceData = {
    data: {
        image: imgECommerce,
        title: "E-Commerce Catalogs",
        content: "Coming soon...",
        enabled: false,
        actionButton: "Details"
    }
}

export const photoData = {
    data: {
        image: imgPhoto,
        title: "Photo gallery",
        content: "Coming soon...",
        enabled: false,
        actionButton: "Details"
    }
}

export const cvData = {
    data: {
        image: imgCv,
        title: "Resume",
        content: "Coming soon...",
        enabled: false,
        actionButton: "Details"
    }
}

export const toDoData = {
    data: {
        image: imgGtd,
        title: "To-Do",
        content: "Coming soon...",
        enabled: false,
        actionButton: "Details"
    }
}

export const logData = {
    data: {
        image: imgLogs,
        title: "System Logs",
        content: "In construction...",
        enabled: false,
        actionButton: "Details"
    }
}

export const knowledgeData = {
    data: {
        image: imgGraph,
        title: "Knowledge graph",
        content: "Coming soon...",
        enabled: false,
        actionButton: "Details"
    }
}