import React, {Component} from 'react';
import {AutoComplete} from 'material-ui';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import TVDBService from '../../Services/TVDBService';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [],
            serieNames: [],
            serieName: ''
        };
    }

    render() {
        return (
            <div className="home">
                <Tabs>
                    <Tab label="Shows">
                        Home
                    </Tab>
                    <Tab label="Add new show" >
                        <AutoComplete
                            value={this.state.serieName}
                            fullWidth={true}
                            animated={false}
                            hintText="Search TVDB by Show Name"
                            dataSource={this.state.serieNames}
                            onUpdateInput={this.handleSeriesNameSearchChange.bind(this)}
                            />
                    </Tab>
                    <Tab label="Activity">
                        (Tab b content...)
                    </Tab>
                </Tabs>
            </div>
        );
    }

    handleSeriesNameSearchChange(name) {
        this.setState({
            serieName: name
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
}

export default Home;
