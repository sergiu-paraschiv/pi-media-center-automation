import TVDBService from '../TVDB/TVDBService';

TVDBService.findSeriesByName('South Park')
    .then((data) => {
        console.log(data);
    });
