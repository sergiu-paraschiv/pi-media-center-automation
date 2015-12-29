import _ from 'lodash';
import moment from 'moment';
import React, {PropTypes, Component} from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';

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
                                <FlatButton
                                    label={<span><span>Remove</span> <i className="material-icons">&#xE872;</i></span>}
                                    onTouchTap={this.handleRemove.bind(this)}
                                    />
                                <ToolbarSeparator />
                                <RaisedButton label="Foo" primary={true} />
                            </ToolbarGroup>
                        </Toolbar>
                    </CardActions>
                </Card>

                {this.renderSeasons()}
            </div>
        );
    }

    renderCardMedia() {
        if(!this.props.series.banner) {
            return null;
        }

        return (
            <CardMedia>
                <img src={this.getBannerUrl(this.props.series.banner)} />
            </CardMedia>
        );
    }

    renderSeasons() {
        const seasons = this.getSeasons();

        return (
            <div className="seasons">
                {seasons.map((season) => {
                    return (
                        <Card key={season.id} initiallyExpanded={false}>
                            <CardTitle
                                className="seasonHeader"
                                title={'Season ' + season.number}
                                subtitle={
                                    season.firstAired.format('YYYY')
                                    + ' - '
                                    + season.episodes.length + ' episodes'
                                }
                                actAsExpander={true}
                                showExpandableButton={true}
                                />
                            <CardText expandable={true}>
                                {this.renderEpisodes(season.episodes)}
                            </CardText>
                        </Card>
                    );
                })}
            </div>
        );
    }

    renderEpisodes(episodes) {
        return (
            <List subheader="Episodes" expandable={true}>
                {episodes.map((episode) => {
                    let avatar;
                    if(episode.filename) {
                        avatar = <Avatar src={this.getBannerUrl(episode.filename)} />;
                    }

                    return (
                        <ListItem
                            key={episode.id}
                            leftAvatar={avatar}
                            primaryText={episode.EpisodeNumber + '. ' + episode.EpisodeName}
                            secondaryText={
                                <p>{episode.Overview}</p>
                            }
                            secondaryTextLines={2}
                            />
                    );
                })}
            </List>
        );
    }

    getBannerUrl(part) {
        return 'http://thetvdb.com/banners/' + part;
    }

    getSeasons() {
        let seasons = _.groupBy(this.props.series.episodes, 'seasonid');

        seasons = _.map(seasons, (episodes) => {
            const season = episodes[0];
            return {
                id: season.seasonid,
                number: season.SeasonNumber,
                firstAired: moment(season.FirstAired),
                episodes: episodes
            };
        });

        _.remove(seasons, {number: '0'});

        seasons = _.sortBy(seasons, (season) => {
            return parseInt(season.number, 10);
        });

        return seasons;
    }

    handleRemove(e) {
        e.preventDefault();

        this.props.onRemove(this.props.series.id);
    }
}

export default ExpandedSeries;
