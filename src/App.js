import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core';

function App() {
    return (
        <div className="App">
            <link rel="stylesheet"
                  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <div className="PageHeader"/>
            <div className="AppBackground">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"
                         style={{backgroundSize: 'cover', backgroundRepeat: 'no-repeat', zIndex: '-2'}}/>
                    <p>
                        -- 欢迎访问白宏伟的网站！ --<br/><br/>
                        -- Welcome to Hongwei's Home Page --
                        {/*Edit <code>src/App.js</code> and save to reload.*/}
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <br/><br/>
                </header>
            </div>
            <div className="PageFooter">
                <a align="right" className="CopyRightLink" href="http://www.beian.miit.gov.cn" target="_blank"
                   rel="noopener noreferrer">互联网ICP备案号: 京ICP备20008547号-1</a>
            </div>
        </div>
    );
}

export default App;
