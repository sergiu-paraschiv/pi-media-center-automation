import WebServerService from '../WebServer/WebServerService';
import RouterService from '../WebServer/RouterService';

WebServerService.setRouter(RouterService.initialize());
WebServerService.servePublic();
WebServerService.start();
