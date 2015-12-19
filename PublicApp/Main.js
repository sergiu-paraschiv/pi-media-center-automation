import React from 'react';
import ReactDOM from 'react-dom';
import InjectTapEventPlugin from 'react-tap-event-plugin';
import Router from './Router/containers/Router';


InjectTapEventPlugin();

ReactDOM.render(
    <Router />,
    document.getElementById('content')
);
