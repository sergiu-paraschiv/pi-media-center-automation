import React, {PropTypes, Component} from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardActions from 'material-ui/lib/card/card-actions';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

class ExpandedSeries extends Component {
    static propTypes = {
        series: PropTypes.object,
        goBack: PropTypes.func
    }

    render() {
        return (
            <div className="expandedSeries">
                <Card>
                    {this.renderCardMedia()}
                    <CardTitle
                        title={this.props.series.name}
                        subtitle={this.props.series.network}
                        />
                    <CardActions>
                        <Toolbar>
                            <ToolbarGroup key={0} float="left">
                                <FlatButton
                                    label="Back to shows"
                                    onTouchTap={this.props.goBack}
                                    />
                            </ToolbarGroup>
                            <ToolbarGroup key={1} float="right">
                                qqq
                                <ToolbarSeparator />
                                <RaisedButton label="Create Broadcast" primary={true} />
                            </ToolbarGroup>
                        </Toolbar>
                    </CardActions>
                </Card>
            </div>
        );
    }

    renderCardMedia() {
        if(!this.props.series.banner) {
            return null;
        }

        return (
            <CardMedia>
                <img src={this.getWideBannerUrl(this.props.series.banner)} />
            </CardMedia>
        );
    }

    getWideBannerUrl(part) {
        return 'http://thetvdb.com/banners/' + part;
    }
}

export default ExpandedSeries;
