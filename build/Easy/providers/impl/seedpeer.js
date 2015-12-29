"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedpeer = undefined;

var _provider = require('../provider.js');

var _provider2 = _interopRequireDefault(_provider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var seedpeer = exports.seedpeer = (function (_Provider) {
  _inherits(seedpeer, _Provider);

  function seedpeer() {
    _classCallCheck(this, seedpeer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(seedpeer).apply(this, arguments));
  }

  _createClass(seedpeer, [{
    key: 'processSearchResponse',
    value: function processSearchResponse($, deferred, scope, torrentResultList) {
      if ($('#body table tr').length > 7) {
        $('#body table tr').each(function (index, torrents) {
          var d = $(this);
          var td = d.children('td');
          var links = $(torrents).find('a');

          $(links).each(function (i, link) {
            if ($(link).attr('href').indexOf("/details/") > -1 && $(link).attr('href').indexOf("facebook") < 1) {
              scope.buildResult(scope.getDataStructure($(link).text(), "", $(td).eq(3).text(), $(td).eq(4).text(), $(td).eq(2).text(), "", scope.baseUrl + $(link).attr('href'), false, $(td).eq(1).text()), torrentResultList, deferred);
            }
          });
        });
      } else {
        deferred.reject("No torrents found");
      }
    }
  }]);

  return seedpeer;
})(_provider2.default);

module.exports = seedpeer;