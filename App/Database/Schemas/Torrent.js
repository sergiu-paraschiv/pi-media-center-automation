import {Schema} from 'mongoose';

const TorrentSchema = new Schema({
    seriesId: String,
    episodeId: String,
    link: String,
    status: String,
    progress: Number,
    title: String,
    hashString: String
});

export default {
    name: 'Torrent',
    schema: TorrentSchema
};
