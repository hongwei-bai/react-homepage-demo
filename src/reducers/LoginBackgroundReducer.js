const initialState = {
    accessToken: ""
}

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export const loginBackgroundReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                accessToken: action.accessToken,
                ...state
            }
        case LOGOUT:
            return {
                initialState
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