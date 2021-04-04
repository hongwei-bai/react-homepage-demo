import {createStore} from "redux";
import {blogReducer} from "./BlogReducer";
import {loginReducer} from "./LoginReducer";
import {localesReducer} from "./LocalesReducer";
import {loginBackgroundReducer} from "./LoginBackgroundReducer";

export const logInStore = createStore(loginReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name: "logInStore"}))
export const logInBackgroundStore = createStore(loginBackgroundReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name: "logInBackgroundStore"}))
export const blogStore = createStore(blogReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name: "blogStore"}))
export const localesStore = createStore(localesReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name: "localesStore"}))

