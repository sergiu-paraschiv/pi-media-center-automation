import React from 'react';
import ReactDOM from 'react-dom';
import InjectTapEventPlugin from 'react-tap-event-plugin';
import PageComponent from './Page/components/PageComponent';


InjectTapEventPlugin();

ReactDOM.render(
    <PageComponent />,
    document.getElementById('content')
);
