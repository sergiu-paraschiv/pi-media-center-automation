import _ from 'lodash';
import React, {Component} from 'react';
import {AutoComplete} from 'material-ui';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import CardActions from 'material-ui/lib/card/card-actions';
import FlatButton from 'material-ui/lib/flat-button';
import Snackbar from 'material-ui/lib/snackbar';
import TVDBService from '../../Services/TVDBService';
import SeriesService from '../../Services/SeriesService';
import SeriesDetails from './SeriesDetails';
import SeriesList from './SeriesList';
import ExpandedSeries from './ExpandedSeries';

const TABS = ['addSeries', 'series', 'activity'];
const SNACKBAR_AUTOHIDE_DURATION = 0;

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
            snackbarActionLabel: null
        };
    }

    componentDidMount() {
        this.reloadMySeries();
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
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    action={this.state.snackbarActionLabel}
                    autoHideDuration={SNACKBAR_AUTOHIDE_DURATION}
                    onActionTouchTap={this.state.snackbarAction}
                    onDismiss={this.handleSnackbarDismiss.bind(this)}
                    />
            </div>
        );
    }

    renderSeriesTab() {
        if(this.state.expandedSeries) {
            return (
                <ExpandedSeries
                    series={this.state.expandedSeries}
                    goBack={this.handleGoBackToSeriesList.bind(this)}
                    onRemove={this.handleRemoveSeries.bind(this)}
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
}

export default Home;
