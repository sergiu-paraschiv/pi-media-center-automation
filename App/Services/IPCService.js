import dnode from 'dnode';
import Config from '../Config';

class IPCService {
    server(handlers) {
        this.server = dnode({
            message: (data, callback) => {
                if(handlers[data.action]) {
                    handlers[data.action].apply(this, data.params)
                        .then((response) => callback(response));
                }
            }
        });

        this.server.listen(Config.IPC.port);
    }

    client() {
        this.client = dnode.connect(Config.IPC.port);
        this.client.on('remote', (remote) => {
            this.remote = remote;
        });
    }

    message(data) {
        return new Promise((resolve, reject) => {
            if(this.remote) {
                this.remote.message(data, (response) => {
                    resolve(response);
                });
            }
            else {
                reject();
            }
        });
    }
}

export default new IPCService();
