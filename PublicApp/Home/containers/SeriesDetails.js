import React, {PropTypes, Component} from 'react';
import {
    Card,
    CardMedia,
    CardTitle,
    CardText
} from 'material-ui';

class SeriesDetails extends Component {
    static propTypes = {
        series: PropTypes.object,
        actions: PropTypes.node,
        overview: PropTypes.bool,
        onClick: PropTypes.func
    }

    static defaultProps = {
        overview: true,
        actions: null,
        onClick: null
    }

    render() {
        let overview = null;
        if(this.props.overview && this.props.series.overview) {
            overview = (
                <CardText>
                    {this.props.series.overview}
                </CardText>
            );
        }
        let card = (
            <Card>
                {this.renderCardMedia()}
                <CardTitle
                    title={this.props.series.name}
                    subtitle={this.props.series.network}
                    />
                {overview}
                {this.props.actions}
            </Card>
        );

        if(this.props.onClick) {
            return this.renderClickable(card);
        }
        else {
            return this.renderDefault(card);
        }

    }

    renderDefault(card) {
        return (
            <div className="seriesDetails">
                {card}
            </div>
        );
    }

    renderClickable(card) {
        return (
            <a href="#" className="seriesDetails" onClick={this.props.onClick}>
                {card}
            </a>
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

export default SeriesDetails;
