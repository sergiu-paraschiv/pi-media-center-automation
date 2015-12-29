import Provider from '../Provider';

class Kickass extends Provider {
    constructor() {
        super({
            name: 'Kickass',
            url: 'https://kat.cr/json.php?field=seeders&order=desc&page=1&q=%query%',
            parser: (result) => {
                return result.list;
            }
        });
    }
}

export default Kickass;
