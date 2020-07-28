import {md5} from "./md5";

export function signature(argsJsonString, tmpToken) {
    const timeStamp = (new Date()).valueOf()
    console.log("timeStamp: " + timeStamp)
    const sign = md5(argsJsonString + tmpToken + timeStamp * 10000).toUpperCase()
    console.log("raw: " + (argsJsonString + tmpToken + timeStamp * 10000))
    console.log("sign: " + sign)
    return sign
}
