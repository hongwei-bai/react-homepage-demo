import {UserRole} from "../constants/LoginContants";
import {logInBackgroundStore} from "./store";

const loginInitialState = {
    isLoggedIn: false,
    refreshToken: "",
    userName: "",
    userRole: UserRole.USER,
    guestCode: "",
    preference: "{}",
    privilege: "{}"
}

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case LOGIN:
            logInBackgroundStore.dispatch({
                type: LOGIN,
                accessToken: action.accessToken
            })
            return {
                ...state,
                isLoggedIn: true,
                refreshToken: action.refreshToken,
                isRefreshingToken: false,
                isGuest: false,
                userName: action.userName,
                userRole: action.userRole,
                preference: parseJsonString(action.preferenceJson),
                privilege: parseJsonString(action.privilegeJson)
            }
        case LOGOUT:
            logInBackgroundStore.dispatch({
                type: LOGOUT
            })
            return {
                loginInitialState
            }
        default:
            return {
                ...state
            }
    }
}

function parseJsonString(json) {
    if (json !== undefined) {
        return JSON.parse(json)
    }
    return "{}"
}