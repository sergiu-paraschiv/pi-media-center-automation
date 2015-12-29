'use strict';

var _TransmissionService = require('../Transmission/TransmissionService');

var _TransmissionService2 = _interopRequireDefault(_TransmissionService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_TransmissionService2.default.start();
_TransmissionService2.default.onStatus(function (status) {
    console.log(status);
});