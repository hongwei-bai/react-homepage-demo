const blogInitialState = {
    blogList: "",
    blogEntries: new Map(),
    blogEntryLatestVisited: []
}

export const BLOG_LIST_UPDATE = 'BLOG_LIST_UPDATE'
export const BLOG_ENTRY_LOAD = 'BLOG_ENTRY_LOAD'
export const BLOG_ENTRY_VISIT = 'BLOG_ENTRY_VISIT'
export const BLOG_ENTRY_INVALIDATE = 'BLOG_ENTRY_INVALIDATE'

const DEBUG = true

export const blogReducer = (state = blogInitialState, action) => {
    let visitedList = state.blogEntryLatestVisited
    let entries = state.blogEntries
    if (DEBUG) {
        console.log("blogReducer: action.type: " + action.type + ", action.id: " + action.id)
        console.log("blogReducer: what in list:")
        console.log("blogReducer: blogEntries.length: " + entries.size)
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
            if (DEBUG) {
                console.log("blogReducer: cache size: " + visitedList.length)
                console.log("blogReducer: REACT_APP_BLOG_MAX_CACHE: " + process.env.REACT_APP_BLOG_MAX_CACHE)
                console.log("blogReducer: will delete: " + visitedList.length > process.env.REACT_APP_BLOG_MAX_CACHE)
            }
            if (visitedList.hasOwnProperty(action.id)) {
                visitedList.delete(action.id)
            } else if (visitedList.length > process.env.REACT_APP_BLOG_MAX_CACHE) {
                let rmvId = visitedList.pop()
                entries.delete(rmvId)
                if (DEBUG) {
                    console.log("blogReducer: add id: " + action.id + ", rmv id: " + rmvId)
                }
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