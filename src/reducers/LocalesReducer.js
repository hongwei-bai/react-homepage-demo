const initialState = {
    initDone: false
}

export const SWITCH_LOCALE = 'SWITCH_LOCALE'

export const localesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_LOCALE:
            return {
                ...state,
                initDone: true
            }
        default:
            return {
                ...state
            }
    }
}