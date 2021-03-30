import {Language, Module, UserRole} from "../constants/LoginContants";

const loginInitialState = {
    isLoggedIn: false,
    accessToken: "",
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
            return {
                ...state,
                isLoggedIn: true,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                isGuest: false,
                userName: action.userName,
                userRole: action.userRole,
                preference: parseJsonString(action.preferenceJson),
                privilege: parseJsonString(action.privilegeJson)
            }
        case LOGOUT:
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