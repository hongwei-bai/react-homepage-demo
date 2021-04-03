import {createStore} from "redux";
import {blogReducer} from "./BlogReducer";
import {loginReducer} from "./LoginReducer";
import {localesReducer} from "./LocalesReducer";

export const logInStore = createStore(loginReducer)
export const blogStore = createStore(blogReducer)
export const localesStore = createStore(localesReducer)
