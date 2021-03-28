import {combineReducers, createStore} from "redux";
import {blogReducer} from "./BlogReducer";
import {loginReducer} from "./LoginReducer";
import {loginBackgroundReducer} from "./LoginBackgroundReducer";

let rootReducer = combineReducers({
    loginReducer,
    loginBackgroundReducer,
    blogReducer
})

const store = createStore(rootReducer)

export const logInStore = createStore(loginReducer)
export const blogStore = createStore(blogReducer)

export default logInStore;