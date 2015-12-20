import React, {Component} from 'react';
import PureRender from 'pure-render-decorator';
import Home from '../../Home/containers/Home';

@PureRender
class PageComponent extends Component {
    render() {
        return (
            <div className="page">
                <Home />
            </div>
        );
    }
}

export default PageComponent;
