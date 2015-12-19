import TransmissionService from '../Transmission/TransmissionService';

TransmissionService.start();
TransmissionService.onStatus((status) => {
    console.log(status);
});
