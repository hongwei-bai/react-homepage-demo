import {LOGIN, LOGOUT} from "./LoginReducer";

export const STATUS_INIT = "STATUS_INIT"
export const STATUS_REFRESHING = "STATUS_REFRESHING"
export const STATUS_REFRESHED = "STATUS_REFRESHED"

export const REFRESHING_TOKEN = 'REFRESHING_TOKEN'
export const REFRESHED_TOKEN = 'REFRESHED_TOKEN'
export const USE_TOKEN = 'USE_TOKEN'

const initialState = {
    accessToken: "",
    refreshTokenStatus: false,
}

export const loginBackgroundReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                accessToken: action.accessToken,
                refreshTokenStatus: STATUS_INIT
            }
        case LOGOUT:
            return {
                initialState
            }
        case REFRESHING_TOKEN:
            return {
                ...state,
                accessToken: "",
                refreshTokenStatus: STATUS_REFRESHING
            }
        case REFRESHED_TOKEN:
            return {
                ...state,
                accessToken: action.accessToken,
                refreshTokenStatus: STATUS_REFRESHED
            }
        case USE_TOKEN:
            return {
                ...state,
                refreshTokenStatus: STATUS_INIT
            }
        default:
            return {
                ...state
            }
    }
}