import {Language, Module, UserRole} from "../constants/LoginContants";

const loginInitialState = {
    isLoggedIn: false,
    accessToken: "",
    refreshToken: "",
    isGuest: false,
    userName: "",
    userRole: UserRole.USER,
    guestCode: "",
    preferenceJson: "",
    preferredLanguage: Language.ENGLISH,
    accessModules: [Module.BLOG, Module.WEB_UPLOAD],
    redirect: ""
}

export const LOGIN_AS_USER = 'LOGIN_AS_USER'
export const LOGIN_AS_GUEST = 'LOGIN_AS_GUEST'
export const LOGOUT = 'LOGOUT'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case LOGIN_AS_USER:
            return {
                isLoggedIn: true,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                isGuest: false,
                userName: action.userName,
                userRole: action.userRole,
                ...state
            }
        case LOGIN_AS_GUEST:
            return {
                isLoggedIn: true,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                isGuest: true,
                guestCode: action.guestCode,
                ...state
            }
        case LOGOUT:
            return {
                loginInitialState
            }
        case REFRESH_TOKEN:
            return {
                accessToken: action.accessToken,
                ...state
            }
        default:
            return {
                ...state
            }
    }
}