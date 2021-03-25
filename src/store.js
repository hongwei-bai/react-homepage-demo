import {createStore} from "redux";

const initialState = {
    blogList: "",
    blogEntries: new Map(),
    blogEntryLatestVisited: []
}

const BLOG_LIST_UPDATE = 'BLOG_LIST_UPDATE'
const BLOG_ENTRY_LOAD = 'BLOG_ENTRY_LOAD'
const BLOG_ENTRY_VISIT = 'BLOG_ENTRY_VISIT'
const BLOG_ENTRY_INVALIDATE = 'BLOG_ENTRY_INVALIDATE'

const DEBUG = false

const blogReducer = (state = initialState, action) => {
    let visitedList = state.blogEntryLatestVisited
    let entries = state.blogEntries
    if (DEBUG) {
        console.log("blogReducer: action.type: " + action.type + ", action.id: " + action.id)
        console.log("blogReducer: what in list:")
        state.blogEntryLatestVisited.forEach(function (element, i) {
            console.log("blogReducer: blogEntryLatestVisited[" + i + "]: " + element)
        })
    }
    switch (action.type) {
        case BLOG_LIST_UPDATE:
            return {
                ...state,
                blogList: action.data
            }
        case BLOG_ENTRY_VISIT:
            let newList = []
            visitedList.forEach(function (id) {
                if (action.id !== id) {
                    newList.push(id)
                }
            })
            newList.unshift(action.id)
            return {
                ...state,
                blogEntryLatestVisited: newList
            }
        case BLOG_ENTRY_INVALIDATE:
            let newList2 = []
            visitedList.forEach(function (id) {
                if (action.id !== id) {
                    newList2.push(id)
                }
            })
            entries.delete(action.id)
            return {
                ...state,
                blogEntryLatestVisited: newList2,
                blogEntries: entries
            }
        case BLOG_ENTRY_LOAD:
            if (visitedList.hasOwnProperty(action.id)) {
                visitedList.delete(action.id)
            } else if (visitedList.length > process.env.REACT_APP_BLOG_MAX_CACHE) {
                let rmvId = visitedList.pop()
                entries.delete(rmvId)
            }
            visitedList.unshift(action.id)
            entries.set(action.id, action.entry)
            return {
                ...state,
                blogEntryLatestVisited: visitedList,
                blogEntries: entries
            }

        default:
            return state
    }
}

const store = createStore(blogReducer)
export default store;