import _ from 'lodash';
import Promise from 'promise';

class Easy {
    constructor() {
        this.providers = [];
    }

    addProvider(provider) {
        this.providers.push(provider);
    }

    find(query) {
        return new Promise((resolve) => {
            let queue = [];
            _.each(this.providers, (provider) => {
                queue.push(provider.find(query));
            });

            Promise.all(queue).then((res) => {
                let data = [];
                _.each(res, (torrents, index) => {
                    data.push({
                        name: this.providers[index].name(),
                        torrents
                    });
                });
                resolve(data);
            });
        });
    }
}

export default Easy;
