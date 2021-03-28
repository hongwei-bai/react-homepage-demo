const initialState = {
    accessToken: ""
}

export const LOGIN_AS_USER = 'LOGIN_AS_USER'
export const LOGIN_AS_GUEST = 'LOGIN_AS_GUEST'
export const LOGOUT = 'LOGOUT'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'

export const loginBackgroundReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_AS_USER:
            return {
                accessToken: action.accessToken,
                ...state
            }
        case LOGIN_AS_GUEST:
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