import _ from 'lodash';
import filesize from 'filesize';
import React, {Component} from 'react';
import {
    AutoComplete,
    Tabs,
    Tab,
    CardActions,
    FlatButton,
    Snackbar,
    Dialog,
    List,
    ListItem,
    IconButton
} from 'material-ui';
import TVDBService from '../../Services/TVDBService';
import TorrentService from '../../Services/TorrentService';
import SeriesService from '../../Services/SeriesService';
import SeriesDetails from './SeriesDetails';
import SeriesList from './SeriesList';
import ExpandedSeries from './ExpandedSeries';

const TABS = ['addSeries', 'series', 'activity'];
const SNACKBAR_AUTOHIDE_DURATION = 0;
const MAX_TORRENTS = 5;
const RELOAD_TORRENTS_INTERVAL = 1000;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'addSeries',
            series: [],
            serieNames: [],
            seriesName: '',
            selectedSeries: null,
            mySeries: [],
            expandedSeries: null,
            snackbarOpen: false,
            snackbarMessage: null,
            snackbarAction: null,
            snackbarActionLabel: null,
            torrentsDialogOpen: false,
            torrentsDialogTitle: null,
            myTorrents: []
        };
    }

    componentDidMount() {
        this.reloadMySeries();
        this.reloadMyTorrents();
        this.reloadTorrentsInterval = setInterval(this.reloadMyTorrents.bind(this), RELOAD_TORRENTS_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.reloadTorrentsInterval);
    }

    render() {
        return (
            <div className="home">
                <Tabs
                    value={this.state.activeTab}
                    onChange={this.handleTabChange.bind(this)}
                    >
                    <Tab label="Add new show" value="addSeries">
                        <div className="addSeries">
                            <AutoComplete
                                searchText={this.state.seriesName}
                                fullWidth={true}
                                animated={false}
                                hintText="Search TVDB by Show Name"
                                dataSource={this.state.serieNames}
                                onUpdateInput={this.handleSeriesNameSearchChange.bind(this)}
                                onNewRequest={this.handleSeriesSelect.bind(this)}
                                filter={this.handleSeriesNameFilter.bind(this)}
                                />
                            {this.renderSeriesDetails()}
                        </div>
                    </Tab>
                    <Tab label="Shows" value="series">
                        {this.renderSeriesTab()}
                    </Tab>
                    <Tab label="Activity" value="activity">
                        (Tab b content...)
                    </Tab>
                </Tabs>
                {this.renderSnackbar()}
                {this.renderTorrentsDialog()}
            </div>
        );
    }

    renderSnackbar() {
        return (
            <Snackbar
                open={this.state.snackbarOpen}
                message={this.state.snackbarMessage}
                action={this.state.snackbarActionLabel}
                autoHideDuration={SNACKBAR_AUTOHIDE_DURATION}
                onActionTouchTap={this.state.snackbarAction}
                onDismiss={this.handleSnackbarDismiss.bind(this)}
                />
        );
    }

    renderTorrentsDialog() {
        if(!this.state.torrents) {
            return null;
        }

        return (
            <Dialog
                title={this.state.torrentsDialogTitle}
                modal={false}
                open={this.state.torrentsDialogOpen}
                onRequestClose={this.handleTorrentsDialogClose.bind(this)}
                bodyClassName="torrentsList"
                >
                {this.state.torrents.map((provider, index) => {
                    return (
                        <List subheader={provider.name} key={index}>
                            {provider.torrents.slice(0, MAX_TORRENTS).map((torrent, index) => {
                                let verified = null;
                                if(torrent.verified === 1) {
                                    verified = <span> - <span className="verifiedTorrent">Verified</span></span>;
                                }
                                return (
                                    <ListItem
                                        key={index}
                                        primaryText={torrent.title}
                                        secondaryText={
                                            <p>{torrent.seeds} seeders - {torrent.peers} peers {verified} - {filesize(torrent.size)} (in {torrent.files} files)</p>
                                        }
                                        secondaryTextLines={1}
                                        rightIconButton={
                                            <IconButton
                                                touch={true}
                                                tooltip="Download"
                                                tooltipPosition="bottom-left"
                                                onTouchTap={this.handleDownloadTorrent(torrent)}
                                                >
                                                <i className="material-icons">&#xE2C4;</i>
                                            </IconButton>
                                        }
                                        >
                                    </ListItem>
                                );
                            })}
                        </List>
                    );
                })}
            </Dialog>
        );
    }

    renderSeriesTab() {
        if(this.state.expandedSeries) {
            return (
                <ExpandedSeries
                    series={this.state.expandedSeries}
                    torrents={this.state.myTorrents}
                    goBack={this.handleGoBackToSeriesList.bind(this)}
                    onRemove={this.handleRemoveSeries.bind(this)}
                    onRemoveDownload={this.handleRemoveDownload.bind(this)}
                    findTorrent={this.handleFindTorrent.bind(this)}
                    />
            );
        }
        else {
            return (
                <SeriesList
                    series={this.state.mySeries}
                    expandSeries={this.handleExpandSeries.bind(this)}
                    />
            );
        }
    }

    renderSeriesDetails() {
        if(!this.state.selectedSeries) {
            return null;
        }

        let actions = null;
        let seriesIsOwned = _.find(this.state.mySeries, {id: this.state.selectedSeries.id });

        if(!seriesIsOwned) {
            actions = (
                <CardActions>
                    <FlatButton
                        label="Add show"
                        onTouchTap={this.handleAddSeries.bind(this)}
                        />
                </CardActions>
            );
        }

        return (
            <SeriesDetails
                series={this.state.selectedSeries}
                actions={actions}
                />
        );
    }

    handleTabChange(tab) {
        if(TABS.indexOf(tab) > -1) {
            this.setState({
                activeTab: tab
            });
        }
    }

    handleSeriesNameSearchChange(name) {
        this.setState({
            seriesName: name
        });

        TVDBService.findSeriesByName(name)
            .then((data) => {
                if(data.serieNames.length > 0) {
                    this.setState({
                        series: data.series,
                        serieNames: data.serieNames
                    });
                }
            });
    }

    handleSeriesNameFilter(searchText, key) {
        return key.toLowerCase().includes(searchText.toLowerCase());
    }

    handleSeriesSelect(name, index) {
        const selectedSeries = this.state.series[index];
        this.setState({
            selectedSeries
        });
    }

    handleAddSeries() {
        SeriesService.add(this.state.selectedSeries)
            .then(() => {
                this.reloadMySeries();
                this.setState({
                    activeTab: 'series',
                    seriesName: '',
                    selectedSeries: null,
                    snackbarOpen: true,
                    snackbarMessage: '"' + this.state.selectedSeries.name + '" was added.',
                    snackbarAction: this.handleUndoAddSeries(this.state.selectedSeries.id),
                    snackbarActionLabel: 'Undo'
                });
            });
    }

    handleSnackbarDismiss() {
        this.setState({
            snackbarOpen: false,
            snackbarMessage: null,
            snackbarAction: null,
            snackbarActionLabel: null
        });
    }

    handleExpandSeries(series) {
        this.setState({
            expandedSeries: series
        });
    }

    handleGoBackToSeriesList() {
        this.handleExpandSeries(null);
    }

    handleUndoAddSeries(id) {
        return (e) => {
            e.preventDefault();

            this.handleRemoveSeries(id);
        };
    }

    // TODO: add UNDO snackbar action
    // TODO: also remove active downloads
    handleRemoveSeries(id) {
        SeriesService.remove(id)
            .then(() => {
                this.reloadMySeries();
                this.setState({
                    snackbarOpen: true,
                    snackbarMessage: 'Show successfully removed.',
                    snackbarAction: null,
                    snackbarActionLabel: null
                });

                if(this.state.expandedSeries.id === id) {
                    this.setState({
                        expandedSeries: null
                    });
                }
            });
    }

    handleRemoveDownload(download) {
        TorrentService.remove(download._id);
    }

    handleFindTorrent(series, episode) {
        const query = this.getEpisodeQuery(series, episode);
        TorrentService.find(query)
            .then((data) => {
                this.setState({
                    torrents: data,
                    torrentsDialogOpen: true,
                    torrentsDialogTitle: query,
                    torrentsEpisodeId: episode.id,
                    torrentsSeriesId: series.id
                });
            });
    }

    handleTorrentsDialogClose() {
        this.setState({
            torrents: null,
            torrentsDialogOpen: false,
            torrentsDialogTitle: null,
            torrentsEpisodeId: null,
            torrentsSeriesId: null
        });
    }

    handleDownloadTorrent(torrent) {
        return (e) => {
            e.preventDefault();

            this.setState({
                torrents: null,
                torrentsDialogOpen: false,
                torrentsDialogTitle: null,
                torrentsEpisodeId: null,
                torrentsSeriesId: null
            });

            TorrentService.download(this.state.torrentsSeriesId, this.state.torrentsEpisodeId, torrent)
                .then(() => {
                    // TODO: optimise this and reload just the episode maybe?
                    this.reloadMySeries();
                });
        };
    }

    reloadMySeries() {
        SeriesService.get()
            .then((data) => {
                if(data.status) {
                    this.setState({
                        mySeries: data.series
                    });
                }
            });
    }

    reloadMyTorrents() {
        TorrentService.get()
            .then((data) => {
                if(data.status) {
                    this.setState({
                        myTorrents: data.torrents
                    });
                }
            });
    }

    getEpisodeQuery(series, episode) {
        return series.name + ' S' + this.addZero(episode.SeasonNumber) + 'E' + this.addZero(episode.EpisodeNumber);
    }

    addZero(s) {
        s = parseInt(s, 10);
        if(s < 10) {
            return '0' + s;
        }

        return s;
    }
}

export default Home;
