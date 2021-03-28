import {md5} from "../utils/md5";
import store from "../reducers/store"
import {LOGIN, LOGOUT} from "../reducers/LoginReducer";
import {getCookie, setCookie} from "../utils/CookieUtils";

export function getCredentialRequestBody(userName, password) {
    if (isGuest(userName)) {
        return {
            guestCode: userName
        }
    } else {
        return {
            userName: userName,
            credential: md5(password).toUpperCase()
        }
    }
}

export function recoverLoginStatusFromCookie() {
    const info = readCookieCredentials()
    if (info !== null) {
        store.dispatch(
            {
                type: LOGIN,
                accessToken: info.accessToken,
                refreshToken: info.refreshToken,
                userName: info.userName,
                userRole: info.role,
                preferenceJson: info.preferenceJson,
                privilegeJson: info.privilegeJson
            }
        )
    } else {
        store.dispatch({
            type: LOGOUT
        })
    }
}

const COOKIE_KEY_LOGIN_INFO = "login_info"

export function clearCookieCredentials() {
    setCookie(COOKIE_KEY_LOGIN_INFO, "", 1)
}

export function writeCookieCredentials(loginInfo) {
    setCookie(COOKIE_KEY_LOGIN_INFO, JSON.stringify(loginInfo), 7)
}

export function readCookieCredentials() {
    const string = getCookie(COOKIE_KEY_LOGIN_INFO)
    if (string !== undefined) {
        return JSON.parse(string)
    } else {
        return null
    }
}

//e.g. g:wq7CjbYja
// Assume a standard guest code starts with 'g:' and has length of 10.
// Don't show password field if user type guest code from 'g:xx'.
export function isValidGuestCode(str) {
    if (str.startsWith("g") && str.length === 1) {
        return true
    } else if (str.startsWith("g:") && str.length <= 10) {
        return true
    }

    return false
}

export function isGuest(userName) {
    if (userName.startsWith("g:")) {
        return true
    } else {
        return false
    }
}