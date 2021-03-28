import {combineReducers, createStore} from "redux";
import {blogReducer} from "./BlogReducer";
import {loginReducer} from "./LoginReducer";
import {loginBackgroundReducer} from "./LoginBackgroundReducer";
import {localesReducer} from "./LocalesReducer";

let rootReducer = combineReducers({
    loginReducer,
    loginBackgroundReducer,
    blogReducer,
    localesReducer
})

const store = createStore(rootReducer)

export const logInStore = createStore(loginReducer)
export const blogStore = createStore(blogReducer)
export const localesStore = createStore(localesReducer)

export default logInStore;