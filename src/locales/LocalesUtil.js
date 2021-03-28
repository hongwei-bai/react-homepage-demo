import intl from 'react-intl-universal';
import {localesStore} from "../reducers/store";
import {SWITCH_LOCALE} from "../reducers/LocalesReducer";

const locales = {
    "en-US": require('../locales/en-US.json'),
    "zh-CN": require('../locales/zh-CN.json'),
};

export function changeLanguage() {
    let defaultLocale
    if (localesStore.getState().locale === "zh-CN") {
        defaultLocale = "en-US";
    } else {
        defaultLocale = "zh-CN";
    }
    sessionStorage["locale"] = defaultLocale;
    initLocale(defaultLocale);
};

export function initLocale(locale = "en-US") {
    intl
        .init({
            currentLocale: sessionStorage["locale"]
                ? sessionStorage["locale"]
                : locale,
            locales: locales
        })
        .then(() => {
            localesStore.dispatch({
                type: SWITCH_LOCALE,
                locale: locale
            })
            // this.forceUpdate();
        });
}