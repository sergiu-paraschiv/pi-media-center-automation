import React, {PropTypes, Component} from 'react';
import PureRender from 'pure-render-decorator';
import {HOME} from '../Routes';
import PageComponent from '../../Page/components/PageComponent';
import Home from '../../Home/containers/Home';

@PureRender
class RouterComponent extends Component {
    static propTypes = {
        route: PropTypes.string
    }

    render() {
        return <PageComponent body={this.renderComponentByRoute(this.props.route)} />;
    }

    renderComponentByRoute(route) {
        switch(route) {
            case HOME:
            default:
                return React.createElement(Home);
        }
    }
}

export default RouterComponent;
