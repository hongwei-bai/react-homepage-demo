import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core';

function App() {
    return (
        <div className="App">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
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
                <Button variant="contained" color="primary" href="http://www.beian.miit.gov.cn">京ICP备20008547号-1</Button>
            </header>
        </div>
    );
}

export default App;
