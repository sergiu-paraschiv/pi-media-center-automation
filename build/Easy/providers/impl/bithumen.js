"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bithumen = undefined;

var _authprovider2 = require('../authprovider.js');

var _authprovider3 = _interopRequireDefault(_authprovider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bithumen = exports.bithumen = (function (_authprovider) {
  _inherits(bithumen, _authprovider);

  function bithumen() {
    _classCallCheck(this, bithumen);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(bithumen).apply(this, arguments));
  }

  _createClass(bithumen, [{
    key: 'doLogin',

    /**
     * loggin in
     */
    value: function doLogin(html) {
      console.info(this.name + ' logging in..');
      var $ = this.cheerio.load(html);
      this.request({
        url: this.loginUrl,
        method: 'POST',
        form: {
          salted_passhash: '',
          salted_passhash_trimmed: '',
          vxx: $('#login-vxx').attr('value'),
          username: this.username,
          password: this.password,
          returnto: '/'
        }
      });
    }
  }, {
    key: 'isLoggedIn',
    value: function isLoggedIn($) {
      return $('#login-vxx').html() == null;
    }
  }, {
    key: 'processSearchResponse',
    value: function processSearchResponse($, deferred, scope, torrentResultList) {
      if (!_get(Object.getPrototypeOf(bithumen.prototype), 'processSearchResponse', this).call(this, $, deferred, scope, torrentResultList)) {
        console.info('We logged in... ' + this.name);
        return;
      }
      if ($('#torrenttable').find('tr').length > 1) {
        $('#torrenttable tr').each(function (index, torrents) {
          if (index > 0) {
            var links = $(torrents).find('td a b');
            $(links).each(function (i, link) {
              var parent = $(link).parent();
              var tdLevel = parent.parent().parent().children('td');
              if (parent.attr('href').indexOf("details.php") > -1) {

                var title = parent.attr('title') ? parent.attr('title') : $(link).text();
                var link = scope.baseUrl + "/" + parent.next().attr('href');
                var dateAdded = tdLevel.eq(4).find('nobr').text();
                var size = tdLevel.eq(5).find('u').text();
                var seed = tdLevel.eq(7).find('font').text();
                var leeech = tdLevel.eq(8).find('a').text();

                scope.buildResult(scope.getDataStructure(title, "", seed, leeech, size, "", link, true, dateAdded), torrentResultList, deferred);
              }
            });
          }
        });
      }
    }
  }]);

  return bithumen;
})(_authprovider3.default);

module.exports = bithumen;