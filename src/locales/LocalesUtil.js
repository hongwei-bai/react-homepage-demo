import intl from 'react-intl-universal';
import {readCookieLocale, writeCookieLocale} from "../services/LoginService";
import {localesStore} from "../reducers/store";
import {SWITCH_LOCALE} from "../reducers/LocalesReducer";

const locales = {
    "en-US": require('../locales/en-US.json'),
    "zh-CN": require('../locales/zh-CN.json'),
};

export function changeLanguage(locale) {
    writeCookieLocale(locale)
    initLocaleImpl(locale);
};

export function initLocale() {
    let locale = readCookieLocale()
    if (locale === "en-US" || locale === "zh-CN") {
        initLocaleImpl(locale)
    } else {
        initLocaleImpl("en-US")
    }
}

export function initLocaleImpl(locale) {
    intl.init({
        currentLocale: locale,
        locales: locales
    }).then(() => {
        localesStore.dispatch({
            type: SWITCH_LOCALE,
            initDone: true
        })
    });
}