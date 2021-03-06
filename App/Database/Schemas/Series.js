import {Schema} from 'mongoose';

const SeriesSchema = new Schema({
    id: String,
    name: String,
    banner: String,
    overview: String,
    fistAired: String,
    network: String,
    imdbId: String,
    episodes: Array
});

export default {
    name: 'Series',
    schema: SeriesSchema
};
