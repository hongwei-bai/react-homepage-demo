import {md5} from "../utils/md5";
import {blogStore, localesStore, logInStore} from "../reducers/store"
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
            credential: md5(password).toLowerCase()
        }
    }
}

export function recoverLoginStatusFromCookie() {
    const info = readCookieCredentials()
    const jwt = readCookieJwt()
    if (info !== null) {
        logInStore.dispatch(
            {
                type: LOGIN,
                accessToken: jwt,
                refreshToken: info.refreshToken,
                userName: info.userName,
                userRole: info.role,
                preferenceJson: info.preferenceJson,
                privilegeJson: info.privilegeJson
            }
        )
    } else {
        executeLogOut()
    }
}

export function executeLogOut() {
    clearCookieCredentials()
    logInStore.dispatch({
        type: LOGOUT
    })
    blogStore.dispatch({
        type: LOGOUT
    })
}

const COOKIE_KEY_LOGIN_INFO = "login_info"
const COOKIE_KEY_ACCESS_TOKEN = "access_token"
const COOKIE_KEY_LOCALE = "locale"

export function clearCookieCredentials() {
    setCookie(COOKIE_KEY_LOGIN_INFO, "", 1)
    setCookie(COOKIE_KEY_ACCESS_TOKEN, "", 1)
    setCookie(COOKIE_KEY_LOCALE, "", 1)
}

export function writeCookieCredentials(loginInfo) {
    setCookie(COOKIE_KEY_LOGIN_INFO, JSON.stringify(loginInfo), 7)
}

export function writeCookieLocale(locale) {
    setCookie(COOKIE_KEY_LOCALE, locale, 7)
}

export function readCookieCredentials() {
    const string = getCookie(COOKIE_KEY_LOGIN_INFO)
    try {
        return JSON.parse(string)
    } catch (exception) {
        return null
    }
}

export function writeCookieJwt(accessToken) {
    setCookie(COOKIE_KEY_ACCESS_TOKEN, accessToken, 1)
}

export function readCookieJwt() {
    return getCookie(COOKIE_KEY_ACCESS_TOKEN)
}

export function readCookieLocale() {
    return getCookie(COOKIE_KEY_LOCALE)
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