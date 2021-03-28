import {combineReducers, createStore} from "redux";
import {blogReducer} from "./BlogReducer";
import {loginReducer} from "./LoginReducer";

let rootReducer = combineReducers({
    loginReducer,
    blogReducer
})

const store = createStore(rootReducer)
export default store;