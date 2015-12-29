'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    WebServer: {
        port: 8080,
        host: 'localhost',
        apiUri: '/api/v1',
        publicPath: __dirname + '/../public/'
    },
    Database: {
        ConnectionString: 'mongodb://localhost:27017/test'
    },
    Transmission: {
        username: 'tr',
        password: 'trtr'
    },
    TVDB: {
        apiKey: '8777CBB503E8461A'
    },
    IPC: {
        port: 15605
    }
};