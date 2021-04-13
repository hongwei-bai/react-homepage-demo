import {logInBackgroundStore, logInStore} from '../reducers/store';
import axios from "axios";
import {baseUrlAuthentication, baseUrlBlog, baseUrlHome} from "./NetworkEndpoints";
import {REFRESHED_TOKEN, REFRESHING_TOKEN, STATUS_INIT} from "../reducers/LoginBackgroundReducer";
import {executeLogOut, writeCookieJwt} from "../services/LoginService";

export const homePageInstance = axios.create({
    baseURL: baseUrlHome(),
    withCredentials: true
})

export const authenticationInstance = axios.create({
    baseURL: baseUrlAuthentication(),
    withCredentials: true
})

export const blogInstance = axios.create({
    baseURL: baseUrlBlog(),
    withCredentials: true
})

homePageInstance.interceptors.request.use(function (config) {
    const jwt = require('../config/config.json').security.publicAccess.jwt
    config.headers.Authorization = jwt ? `Bearer ${jwt}` : '';
    return config;
});

logInBackgroundStore.subscribe(() => {
    writeCookieJwt(logInBackgroundStore.getState().accessToken)
    blogInstance.interceptors.request.use(function (config) {
        const jwt = logInBackgroundStore.getState().accessToken
        // const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYW1ldXNlciIsImV4cCI6MTYxNzQzMDU1OSwiaWF0IjoxNjE3NDMwNDk5fQ.MctAGPKre77IeuqVeO65Pz9VQf6SVhhFtNgIONYztuM"
        config.headers.Authorization = jwt ? `Bearer ${jwt}` : '';
        return config;
    });
})

blogInstance.interceptors.response.use(response => {
    return response
}, reason => {
    const {
        config,
        response: {status, data}
    } = reason
    console.log("homePageInstance api failure - config: " + JSON.stringify(config))
    console.log("homePageInstance api failure - status: " + status)
    console.log("homePageInstance api failure - data: " + JSON.stringify(data))
    if (status === 401 && data.subCode === 1
        && logInStore.getState().isLoggedIn && logInStore.getState().refreshToken !== undefined) {
        if (logInBackgroundStore.getState().refreshTokenStatus === STATUS_INIT) {
            logInBackgroundStore.dispatch({type: REFRESHING_TOKEN})
            authenticationInstance.post("/authenticate/refreshToken.do", {
                refreshToken: logInStore.getState().refreshToken
            }).then(response => {
                const newJwt = response.data.token
                if (newJwt !== undefined && newJwt !== "") {
                    logInBackgroundStore.dispatch({
                        type: REFRESHED_TOKEN,
                        accessToken: newJwt
                    })
                } else {
                    executeLogOut()
                }
            }).catch(cause => {
                executeLogOut()
            })
        }
    }
})