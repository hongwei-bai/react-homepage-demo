import {Language, Module, UserRole} from "../constants/LoginContants";

const loginInitialState = {
    isLoggedIn: false,
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

export const loginReducer = (state = loginInitialState, action) => {
    switch (action.type) {
        case LOGIN_AS_USER:
            return {
                ...state,
                isLoggedIn: true,
                refreshToken: action.refreshToken,
                isGuest: false,
                userName: action.userName,
                userRole: action.userRole
            }
        case LOGIN_AS_GUEST:
            return {
                ...state,
                isLoggedIn: true,
                refreshToken: action.refreshToken,
                isGuest: true,
                guestCode: action.guestCode
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