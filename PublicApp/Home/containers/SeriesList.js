import React, {PropTypes, Component} from 'react';
import SeriesDetails from './SeriesDetails';

class SeriesList extends Component {
    static propTypes = {
        series: PropTypes.object,
        expandSeries: PropTypes.func
    }

    render() {
        return (
            <div className="seriesList">
                {this.props.series.map((s) =>
                    <SeriesDetails
                        series={s}
                        overview={false}
                        onClick={this.goToDetail(s)}
                        />
                )}
            </div>
        );
    }

    goToDetail(series) {
        return (e) => {
            e.preventDefault();
            this.props.expandSeries(series);
        };
    }
}

export default SeriesList;
