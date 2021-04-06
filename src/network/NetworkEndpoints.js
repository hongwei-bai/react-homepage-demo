export function baseUrlHome() {
    if (process.env.REACT_APP_SERVICE_HOME.startsWith("http")) {
        return process.env.REACT_APP_SERVICE_HOME
    } else {
        return process.env.REACT_APP_SERVICE_DOMAIN + process.env.REACT_APP_SERVICE_HOME
    }
}

export function baseUrlAuthentication() {
    if (process.env.REACT_APP_SERVICE_AUTHENTICATION.startsWith("http")) {
        return process.env.REACT_APP_SERVICE_AUTHENTICATION
    } else {
        return process.env.REACT_APP_SERVICE_DOMAIN + process.env.REACT_APP_SERVICE_AUTHENTICATION
    }
}

export function baseUrlBlog() {
    if (process.env.REACT_APP_SERVICE_BLOG.startsWith("http")) {
        return process.env.REACT_APP_SERVICE_BLOG
    } else {
        return process.env.REACT_APP_SERVICE_DOMAIN + process.env.REACT_APP_SERVICE_BLOG
    }
}

export function baseUrlFileServer() {
    if (process.env.REACT_APP_FILE_SERVER.startsWith("http")) {
        return process.env.REACT_APP_FILE_SERVER
    } else {
        return process.env.REACT_APP_SERVICE_DOMAIN + process.env.REACT_APP_FILE_SERVER
    }
}