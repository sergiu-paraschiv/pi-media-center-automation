import React, {Component} from 'react';
import StoreListener from '../../Core/StoreListener';
import RouterStore from '../RouterStore';
import {ROUTE_CHANGED} from '../Events';
import RouterComponent from '../Components/RouterComponent';

@StoreListener(RouterStore)
class Router extends Component {
    constructor(props) {
        super(props);

        this.state = {
            route: RouterStore.getCurrentRoute()
        };
    }

    render() {
        return <RouterComponent {... this.state} />;
    }

    onChange(event) {
        if(event === ROUTE_CHANGED) {
            this.setState({
                route: RouterStore.getCurrentRoute()
            });
        }
    }
}

export default Router;
