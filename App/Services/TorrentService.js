import Easy from '../Easy/Easy';
import Kickass from '../Easy/Providers/Kickass';

class TorrentService {
    constructor() {
        this.client = new Easy();
        this.client.addProvider(new Kickass());
    }

    find(query) {
        return this.client.find(query);
    }
}

export default new TorrentService();
