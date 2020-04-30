import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';
import { Root } from './components/Root';

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

ReactDOM.render(
    <React.Fragment>
        <CssBaseline />
        <Root />
    </React.Fragment>,
    document.getElementById('app')
);