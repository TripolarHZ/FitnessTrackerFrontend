import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const App = () => {
    return <div className='app'>
        <p>Hello world!</p>
    </div>
}

ReactDOM.render(
    <Router>  
        <App />
    </Router>,
      document.getElementById('app')
    )