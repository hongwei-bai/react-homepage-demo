import {logInBackgroundStore, logInStore} from '../reducers/store';
import axios from "axios";
import {baseUrlAuthentication, baseUrlHome} from "./NetworkEndpoints";
import {LOGOUT} from "../reducers/LoginReducer";
import {REFRESHED_TOKEN, REFRESHING_TOKEN, STATUS_INIT} from "../reducers/LoginBackgroundReducer";
import {writeCookieJwt} from "../services/LoginService";

export const homePageInstance = axios.create({
    baseURL: baseUrlHome(),
    withCredentials: true
})

export const authenticationInstance = axios.create({
    baseURL: baseUrlAuthentication(),
    withCredentials: true
})

logInBackgroundStore.subscribe(() => {
    writeCookieJwt(logInBackgroundStore.getState().accessToken)
    homePageInstance.interceptors.request.use(function (config) {
        const jwt = logInBackgroundStore.getState().accessToken
        // const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYW1ldXNlciIsImV4cCI6MTYxNzQzMDU1OSwiaWF0IjoxNjE3NDMwNDk5fQ.MctAGPKre77IeuqVeO65Pz9VQf6SVhhFtNgIONYztuM"
        config.headers.Authorization = jwt ? `Bearer ${jwt}` : '';
        return config;
    });
})

homePageInstance.interceptors.response.use(response => {
    return response
}, reason => {
    const {
        config,
        response: {status, data}
    } = reason
    console.log("homePageInstance api failure - config: " + JSON.stringify(config))
    console.log("homePageInstance api failure - status: " + status)
    console.log("homePageInstance api failure - data: " + JSON.stringify(data))
    if (status === 401 && logInStore.getState().isLoggedIn && logInStore.getState().refreshToken !== undefined) {
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
                    logInBackgroundStore.dispatch({type: LOGOUT})
                }
            }).catch(cause => {
                logInBackgroundStore.dispatch({type: LOGOUT})
            })
        } else {
            logInStore.dispatch({type: LOGOUT})
        }
    }
})