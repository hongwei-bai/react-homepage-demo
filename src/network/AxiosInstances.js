import {logInBackgroundStore, logInStore} from '../reducers/store';
import axios from "axios";
import {baseUrlAuthentication, baseUrlBlog, baseUrlFileServer, baseUrlHome} from "./NetworkEndpoints";
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

export const fileServiceInstance = axios.create({
    baseURL: baseUrlFileServer(),
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
        // const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeWgiLCJleHAiOjE2MTkyNTU5MzQsImlhdCI6MTYxOTI0NTEzNH0.0ufmk0U1ABkZesVCkXX9S0W9nwImyJlVxvM1Z60zxcU"
        config.headers.Authorization = jwt ? `Bearer ${jwt}` : '';
        return config;
    });
    fileServiceInstance.interceptors.request.use(function (config) {
        const jwt = logInBackgroundStore.getState().accessToken
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
    handleTokenExpire(config, status, data)
})

fileServiceInstance.interceptors.response.use(response => {
    return response
}, reason => {
    const {
        config,
        response: {status, data}
    } = reason
    handleTokenExpire(config, status, data)
})

function handleTokenExpire(config, status, data) {
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
}