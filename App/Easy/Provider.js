import Promise from 'promise';
import Request from 'superagent';

class Provider {
    constructor(config) {
        this.config = config;
    }

    name() {
        return this.config.name;
    }

    find(query) {
        return new Promise((resolve, reject) => {
            Request.get(this.config.url.replace('%query%', query))
                .end((err, res) => {
                    if(err) {
                        reject();
                    }
                    else {
                        let json = JSON.parse(res.text);
                        if(this.config.parser) {
                            json = this.config.parser(json);
                        }
                        resolve(json);
                    }
                });
        });
    }
}

export default Provider;
