import {createStore} from "redux";
import {blogReducer} from "./BlogReducer";
import {loginReducer} from "./LoginReducer";
import {localesReducer} from "./LocalesReducer";
import {loginBackgroundReducer} from "./LoginBackgroundReducer";

export let logInStore
export let logInBackgroundStore
export let blogStore
export let localesStore

if (process.env.REACT_APP_DEBUG === true.toString()) {
    logInStore = createStore(loginReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name: "logInStore"}))
    logInBackgroundStore = createStore(loginBackgroundReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name: "logInBackgroundStore"}))
    blogStore = createStore(blogReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name: "blogStore"}))
    localesStore = createStore(localesReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({name: "localesStore"}))
} else {
    logInStore = createStore(loginReducer)
    logInBackgroundStore = createStore(loginBackgroundReducer)
    blogStore = createStore(blogReducer)
    localesStore = createStore(localesReducer)
}


