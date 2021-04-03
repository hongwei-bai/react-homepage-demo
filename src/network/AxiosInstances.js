import store from '../reducers/store';
import axios from "axios";
import {baseUrlHome} from "./NetworkEndpoints";

export const homePageInstance = axios.create({
    baseURL: baseUrlHome()
})

homePageInstance.interceptors.request.use(function (config) {
    const jwt = store.getState().accessToken
    config.headers.Authorization = jwt ? `Bearer ${jwt}` : '';
    return config;
});