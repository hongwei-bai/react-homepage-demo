import React from 'react';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "test"
        }
    }

    test() {
        // // Opera 8.0+
        // const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        //
        // // Firefox 1.0+
        // const isFirefox = typeof InstallTrigger !== 'undefined';
        //
        // // Safari 3.0+ "[object HTMLElementConstructor]"
        // const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
        //     return p.toString() === "[object SafariRemoteNotification]";
        // })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
        //
        // // Internet Explorer 6-11
        // const isIE = /*@cc_on!@*/false || !!document.documentMode;
        //
        // // Edge 20+
        // const isEdge = !isIE && !!window.StyleMedia;
        //
        // // Chrome 1 - 71
        // const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
        //
        // // Blink engine detection
        // const isBlink = (isChrome || isOpera) && !!window.CSS;
        //
        // console.log("isOpera: " + isOpera)
        // console.log("isFirefox: " + isFirefox)
        // console.log("isSafari: " + isSafari)
        // console.log("isIE: " + isIE)
        // console.log("isEdge: " + isEdge)
        // console.log("isChrome: " + isChrome)
        // console.log("isBlink: " + isBlink)

        // process.platform
        let os = require('os');
        console.log(os.type()); // "Windows_NT"
        console.log(os.release()); // "10.0.14393"
        console.log(os.platform()); // "win32"

        this.setState({
            test: os.type() + "\n" + os.release() + "\n" + os.platform()
        })
    }

    componentDidMount() {
        this.test()
    }

    render() {
        return <h1>{this.state.test}</h1>
    }
}

export default UserInfo;
