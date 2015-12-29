import _ from 'lodash';
import moment from 'moment';
import React, {PropTypes, Component} from 'react';
import {
    Card,
    CardMedia,
    CardTitle,
    CardText,
    CardActions,
    Toolbar,
    ToolbarGroup,
    ToolbarSeparator,
    FlatButton,
    RaisedButton,
    IconButton,
    IconMenu,
    MenuItem,
    List,
    ListItem,
    Avatar,
    LinearProgress
} from 'material-ui';

class ExpandedSeries extends Component {
    static propTypes = {
        series: PropTypes.object,
        torrents: PropTypes.arrayOf(PropTypes.object),
        goBack: PropTypes.func,
        onRemove: PropTypes.func,
        findTorrent: PropTypes.func,
        onRemoveDownload: PropTypes.func
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
                {seasons.reverse().map((season) => {
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
            <List subheader="Episodes">
                {episodes.map((episode) => {
                    let avatar;
                    if(episode.filename) {
                        avatar = <Avatar src={this.getBannerUrl(episode.filename)} />;
                    }

                    return (
                        <div key={episode.id}>
                            <ListItem
                                leftAvatar={avatar}
                                primaryText={episode.EpisodeNumber + '. ' + episode.EpisodeName}
                                secondaryText={
                                    <p>{episode.Overview}</p>
                                }
                                secondaryTextLines={2}
                                rightIconButton={this.renderEpisodeMenu(episode)}
                                initiallyOpen={true}
                                nestedItems={this.renderEpisodeDownloads(episode)}
                                >
                            </ListItem>
                        </div>
                    );
                })}
            </List>
        );
    }

    renderEpisodeMenu(episode) {
        let actions = [];

        actions.push(
            <MenuItem
                onTouchTap={this.handleEpisodeSearch(episode)}
                >
                Search torrents
            </MenuItem>
        );

        let iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="Actions"
                tooltipPosition="bottom-left"
                >
                <i className="material-icons">&#xE5D4;</i>
            </IconButton>
        );

        return (
            <IconMenu
                iconButtonElement={iconButtonElement}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                >
                {actions}
            </IconMenu>
        );
    }

    renderEpisodeDownloads(episode) {
        let downloads = _.filter(this.props.torrents, {seriesId: this.props.series.id, episodeId: episode.id});

        if(!downloads) {
            return null;
        }

        return downloads.map((download) => {
            return (
                <ListItem key={download._id}
                    secondaryText={
                        <p>{download.title} - {download.progress}%</p>
                    }
                    secondaryTextLines={1}
                    rightIconButton={
                        <IconButton
                            touch={true}
                            tooltip="Remove"
                            tooltipPosition="bottom-left"
                            className="removeTorrentDownload"
                            onTouchTap={this.handleRemoveDownload(download)}
                            >
                            <i className="material-icons">&#xE5C9;</i>
                        </IconButton>
                    }
                    >
                    <LinearProgress mode="determinate" color={"#4CAF50"} value={download.progress} />
                </ListItem>
            );
        });
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

    handleRemoveDownload(download) {
        return (e) => {
            e.preventDefault();
            this.props.onRemoveDownload(download);
        };
    }

    handleEpisodeSearch(episode) {
        return (e) => {
            e.preventDefault();
            this.props.findTorrent(this.props.series, episode);
        };
    }
}

export default ExpandedSeries;
