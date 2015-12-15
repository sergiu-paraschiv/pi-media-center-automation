import TransmissionService from './Transmission/TransmissionService';
import TVDBService from './TVDB/TVDBService';

TransmissionService.start();
TransmissionService.onStatus((status) => {
    console.log(status);
});

TVDBService.findSeriesByName('South Park')
    .then((data) => {
        console.log(data);
    });
