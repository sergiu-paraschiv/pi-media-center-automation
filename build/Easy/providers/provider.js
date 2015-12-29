"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Provider = undefined;

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _q = require("q");

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * base provider class
 */

var Provider = exports.Provider = (function () {
	function Provider(urlParams, getParams, responseFormat) {
		_classCallCheck(this, Provider);

		this._urlParams = urlParams;
		this._getParams = getParams;
		this._responseFormat = responseFormat;
		this._cheerio = _cheerio2.default;
		this._request = _request2.default;
		this._lastQuery = undefined;
		this._requestOptions = {};
	}

	/**
  * uses getparams for preparing url replacing
  * query pattern and constructing get parameters
  */

	_createClass(Provider, [{
		key: "getSearchUrl",
		value: function getSearchUrl(query) {
			var result = this.baseUrl;
			result += this.searchHierPart;
			if (result.indexOf('%q') != -1) {
				query = query.split(' ').join(this.hierEscapeChar);
				result = result.split('%q').join(query);
			}
			//prepare get parameters
			if (this.getparams) {
				var count = 1;
				for (var param in this.getparams) {
					// console.log(result);
					if (count == 1) {
						if (!(result.indexOf('?', result.length - '?'.length) !== -1)) {
							result = result + '?';
						}
					} else {
						result = result + "&";
					}
					//if %q is in get part
					if (this.getparams[param] == '%q') {
						this.getparams[param] = encodeURIComponent(query);
					}
					result = result + param + '=' + this.getparams[param];
					count = count + 1;
				}
			}
			return result;
		}

		/**
   * "abstract function" , should be overridden in every subclass to do
   *  the transformation from html/json into js object
   */

	}, {
		key: "processSearchResponse",
		value: function processSearchResponse(data) {
			console.warn('Unimplemented method: processResponse in class ' + this.name);
		}

		/**
   * generates a unified object with default parameters from every provider response
   * should be called from processResponse function
   */

	}, {
		key: "getDataStructure",
		value: function getDataStructure(title, category, seeds, leechs, size, magnetLink, torrentLink, verified, dateAdded) {
			return {
				"title": title,
				"category": category ? category : "",
				"seeds": seeds ? seeds : "not available",
				"leechs": leechs ? leechs : "not available",
				"size": size ? size : -1,
				"magnetLink": magnetLink ? magnetLink : "",
				"torrentlink": torrentLink ? torrentLink : "",
				"verified": verified ? verified : false,
				"dateAdded": dateAdded ? dateAdded : -1
			};
		}

		/**
   * called from the subclass after json/html was parsed and
   * we generate the result object
   */

	}, {
		key: "buildResult",
		value: function buildResult(data, torrentResultList, deferred) {
			data['num'] = torrentResultList.length + 1;
			data['providerName'] = this.name;
			torrentResultList.push(data);
			deferred.resolve(torrentResultList);
		}

		/**
   * helper function, formats bytes
   */

	}, {
		key: "bytesToSize",
		value: function bytesToSize(bytes) {
			var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes === 0) return '0 Byte';
			var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			return Math.round(bytes / Math.pow(1024, i), 2) + '' + sizes[i];
		}

		/**
   * does the html request and starts to process the response
   * 'processResponse' should be overridden in subclasses!
   */

	}, {
		key: "search",
		value: function search(query) {

			var deferred = _q2.default.defer();
			var scope = this;
			this._requestOptions['url'] = this.getSearchUrl(query);

			console.log('calling url: ' + this.requestOptions.url + " response format:" + scope.responseFormat);
			//save for future use
			this.lastQuery = query;

			//do request
			this.request(this.requestOptions, function (err, response, body) {
				if (!err && response.statusCode === 200) {
					var data;
					var torrentResultList = [];
					switch (scope.responseFormat) {
						case 'json':
							data = JSON.parse(body);
							break;
						default:
							data = _cheerio2.default.load(body);
							break;
					}
					if (data) {
						scope.processSearchResponse(data, deferred, scope, torrentResultList);
						return;
					}
				}
				deferred.reject("There was a problem loading " + scope.name + " code " + response.statusCode);
			});
			return deferred.promise;
		}

		/**
   * getters
   */

	}, {
		key: "getparams",
		get: function get() {
			return this._getParams;
		}
	}, {
		key: "name",
		get: function get() {
			return this.constructor.name;
		}
	}, {
		key: "baseUrl",
		get: function get() {
			return this._urlParams.baseUrl;
		}
	}, {
		key: "searchHierPart",
		get: function get() {
			return this._urlParams.searchHierPart;
		}
	}, {
		key: "searchUrl",
		get: function get() {
			return this.baseUrl + this.searchHierPart;
		}
	}, {
		key: "hierEscapeChar",
		get: function get() {
			return this._urlParams.hierEscapeChar ? this._urlParams.hierEscapeChar : '-';
		}
	}, {
		key: "responseFormat",
		get: function get() {
			return this._responseFormat;
		}
	}, {
		key: "lastQuery",
		get: function get() {
			return this._lastQuery;
		},
		set: function set(value) {
			this._lastQuery = value;
		}

		//set getters/setters for http client & dom processor

	}, {
		key: "cheerio",
		get: function get() {
			return this._cheerio;
		}
	}, {
		key: "request",
		get: function get() {
			return this._request;
		},
		set: function set(value) {
			this._request = value;
		}
	}, {
		key: "requestOptions",
		get: function get() {
			return this._requestOptions;
		}
	}]);

	return Provider;
})();

module.exports = Provider;