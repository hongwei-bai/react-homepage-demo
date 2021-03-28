import {md5} from "../utils/md5";
import store from "../reducers/store"
import {LOGIN_AS_GUEST, LOGIN_AS_USER, LOGOUT} from "../reducers/LoginReducer";
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
    let [user, jwt, refreshToken] = readCookieCredentials()
    console.log("read from cookie: " + user)
    console.log("read from cookie: " + jwt)
    console.log("read from cookie: " + refreshToken)

    if (user != null && user.length > 0
        && jwt != null && jwt.length > 0
        && refreshToken != null && refreshToken.length > 0) {
        if (isGuest(user)) {
            store.dispatch(
                {
                    type: LOGIN_AS_GUEST,
                    accessToken: jwt,
                    refreshToken: refreshToken,
                    guestCode: user
                }
            )
        } else {
            store.dispatch(
                {
                    type: LOGIN_AS_USER,
                    accessToken: jwt,
                    refreshToken: refreshToken,
                    userName: user
                }
            )
        }
    } else {
        store.dispatch({
            type: LOGOUT
        })
    }
}

const COOKIE_KEY_USER = "user"
const COOKIE_KEY_JWT = "jwt"
const COOKIE_KEY_REFRESH_TOKEN = "refreshToken"

export function clearCookieCredentials() {
    setCookie(COOKIE_KEY_USER, "", 1)
    setCookie(COOKIE_KEY_JWT, "", 1)
    setCookie(COOKIE_KEY_REFRESH_TOKEN, "", 1)
}

export function writeCookieCredentials(user, jwt, refreshToken) {
    setCookie(COOKIE_KEY_USER, user, 30)
    setCookie(COOKIE_KEY_JWT, jwt, 7)
    setCookie(COOKIE_KEY_REFRESH_TOKEN, refreshToken, 30)
}

export function readCookieCredentials() {
    return [getCookie(COOKIE_KEY_USER), getCookie(COOKIE_KEY_JWT), getCookie(COOKIE_KEY_REFRESH_TOKEN)]
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