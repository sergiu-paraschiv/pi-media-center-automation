import DB from '../Database/DB';
import WebServerService from '../WebServer/WebServerService';
import RouterService from '../WebServer/RouterService';

DB.connect().then(() => {
    WebServerService.setRouter(RouterService.initialize());
    WebServerService.servePublic();
    WebServerService.start();
});
