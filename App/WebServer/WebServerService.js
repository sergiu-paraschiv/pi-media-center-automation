import Express from 'express';
import BodyParser from 'body-parser';
import Config from '../Config';
import IPCService from '../Services/IPCService';

class WebServerService {
    constructor() {
        this.server = new Express();
        this.server.use(BodyParser.urlencoded({ extended: true }));
        this.server.use(BodyParser.json());
    }

    setRouter(router) {
        this.server.use(Config.WebServer.apiUri, router);
    }

    servePublic() {
        this.server.use(Express.static(Config.WebServer.publicPath));
    }

    start() {
        IPCService.client();
        this.server.listen(Config.WebServer.port, Config.WebServer.host);
    }
}

export default new WebServerService();
