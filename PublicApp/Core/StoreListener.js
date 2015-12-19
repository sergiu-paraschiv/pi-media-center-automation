import React, {Component} from 'react';


export default (...stores) => {
    return (DecoratedComponent) => {
        let originalComponentWillMount;
        let originalComponentWillUnmount;

        if(DecoratedComponent.prototype.componentWillMount) {
            originalComponentWillMount = DecoratedComponent.prototype.componentWillMount;
        }

        if(DecoratedComponent.prototype.componentWillUnmount) {
            originalComponentWillUnmount = DecoratedComponent.prototype.componentWillUnmount;
        }

        function componentWillMount() {
            if(originalComponentWillMount) {
                originalComponentWillMount.call(this);
            }
            this.changeListener = this.onChange.bind(this);
            stores.forEach((store) => store.addChangeListener(this.changeListener));
        }

        function componentWillUnmount() {
            if(originalComponentWillUnmount) {
                originalComponentWillUnmount.call(this);
            }
            stores.forEach((store) => store.removeChangeListener(this.changeListener));
        }

        DecoratedComponent.prototype.componentWillMount = componentWillMount;
        DecoratedComponent.prototype.componentWillUnmount = componentWillUnmount;

        return class extends Component {
            render() {
                return <DecoratedComponent {...this.props} />;
            }
        };
    };
};
