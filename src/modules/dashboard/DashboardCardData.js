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

export function dataCovid19() {
    return {
        data: {
            image: imgCovid19,
            title: intl.get("covid19"),
            dynamicContent: "covid19",
            enabled: false,
            actionButton: intl.get("details")
        }
    }
}

export function blogData() {
    return {
        data: {
            image: imgBlog,
            title: intl.get('blog'),
            content: intl.get("comingSoon"),
            enabled: true,
            actionPath: "/blog",
            actionButton: intl.get("details")
        }
    }
}

export function adminData() {
    return {
        data: {
            image: imgAdmin,
            title: intl.get("administration"),
            content: intl.get("inConstruction"),
            enabled: false,
            actionButton: intl.get("details")
        }
    }
}

export function eCommerceData() {
    return {
        data: {
            image: imgECommerce,
            title: intl.get("eCommerceCatalogue"),
            content: intl.get("comingSoon"),
            enabled: false,
            actionButton: intl.get("details")
        }
    }
}

export function photoData() {
    return {
        data: {
            image: imgPhoto,
            title: intl.get("photoGallery"),
            content: intl.get("comingSoon"),
            enabled: false,
            actionButton: intl.get("details")
        }
    }
}

export function cvData() {
    return {
        data: {
            image: imgCv,
            title: intl.get("resume"),
            content: intl.get("comingSoon"),
            enabled: false,
            actionButton: intl.get("details")
        }
    }
}

export function toDoData() {
    return {
        data: {
            image: imgGtd,
            title: intl.get("todo"),
            content: intl.get("comingSoon"),
            enabled: false,
            actionButton: intl.get("details")
        }
    }
}

export function logData() {
    return {
        data: {
            image: imgLogs,
            title: intl.get("systemLogs"),
            content: intl.get("inConstruction"),
            enabled: false,
            actionButton: intl.get("details")
        }
    }
}

export function knowledgeData() {
    return {
        data: {
            image: imgGraph,
            title: intl.get("knowledgeGraph"),
            content: intl.get("comingSoon"),
            enabled: false,
            actionButton: intl.get("details")
        }
    }
}