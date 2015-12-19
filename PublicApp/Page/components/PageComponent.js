import React, {PropTypes, Component} from 'react';
import PureRender from 'pure-render-decorator';

@PureRender
class PageComponent extends Component {
    static propTypes = {
        body: PropTypes.node
    }

    render() {
        return (
            <div className="page">
                {this.props.body}
            </div>
        );
    }
}

export default PageComponent;
