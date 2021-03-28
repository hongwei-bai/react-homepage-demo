const initialState = {
    locale: "en-US"
}

export const SWITCH_LOCALE = 'SWITCH_LOCALE'

export const localesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_LOCALE:
            return {
                ...state,
                locale: action.locale
            }
        default:
            return {
                ...state
            }
    }
}