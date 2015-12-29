"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requireDir = require('require-dir');
var providerClazzDir = requireDir('./providers/impl', { recurse: true });

var searchtorrents = exports.searchtorrents = (function () {
	function searchtorrents() {
		_classCallCheck(this, searchtorrents);

		this._providers = new Map();
		this._availableProviders = new Map();
		this._availableProviders.set('btdigg', [{ baseUrl: 'https://btdigg.org', searchHierPart: '/search' }, { q: '%q', p: 0, order: 1 }, 'html']);
		this._availableProviders.set('bithumen', [{ baseUrl: 'https://bithumen.ru', loginUrl: '/takelogin.php', searchHierPart: '/browse.php' }, { search: '%q', sort: 'seeders', d: 'DESC' }, 'html']);
		this._availableProviders.set('cpasbien', [{ baseUrl: 'http://www.cpasbien.io', searchHierPart: '/recherche/%q.html', hierEscapeChar: '-' }, {}, 'html']);
		this._availableProviders.set('extratorrent', [{ baseUrl: 'http://extratorrent.cc', searchHierPart: '/search/' }, { search: '%q', new: 1, x: 0, y: 0 }, 'html']);
		this._availableProviders.set('eztv', [{ baseUrl: 'https://www.eztv.ag', searchHierPart: '/search/%q', hierEscapeChar: '-' }, {}, 'html']);
		this._availableProviders.set('getstrike', [{ baseUrl: 'https://getstrike.net', searchHierPart: '/api/v2/torrents/search' }, { phrase: '%q' }, 'json']);
		this._availableProviders.set('kickass', [{ baseUrl: 'https://kat.cr', searchHierPart: '/json.php' }, { q: '%q', field: 'seeders', order: 'desc', page: 1 }, 'json']);
		this._availableProviders.set('leetx', [{ baseUrl: 'https://1337x.to', searchHierPart: '/search/%q/1/', hierEscapeChar: '+' }, {}, 'html']);
		this._availableProviders.set('limetorrents', [{ baseUrl: 'http://limetorrents.cc', searchHierPart: '/search/all/%q/seeds/1/', hierEscapeChar: '-' }, {}, 'html']);
		this._availableProviders.set('nyaa', [{ baseUrl: 'http://www.nyaa.se', searchHierPart: '/' }, { term: '%q', page: 'search', sort: 2 }, 'html']);
		this._availableProviders.set('ncore', [{ baseUrl: 'https://ncore.cc', searchHierPart: '/torrents.php', loginUrl: '/login.php' }, { mire: '%q', miszerint: 'seeders', hogyan: 'DESC', miben: 'name' }, 'html']);
		this._availableProviders.set('rarbg', [{ baseUrl: 'https://torrentapi.org', searchHierPart: '/pubapi_v2.php' }, { search_string: '%q', mode: 'search', sort: 'seeders', format: 'json_extended', token: '' }, 'json']);
		this._availableProviders.set('seedpeer', [{ baseUrl: 'http://seedpeer.eu', searchHierPart: '/search/%q/4/1.html', hierEscapeChar: '-' }, undefined, 'html']);
		this._availableProviders.set('tokyotosho', [{ baseUrl: 'https://www.tokyotosho.info', searchHierPart: '/search.php', hierEscapeChar: '+' }, { terms: '%q', type: 0, size_min: '', size_max: '', username: '' }, 'html']);
		this._availableProviders.set('tpb', [{ baseUrl: 'https://thepiratebay.la', searchHierPart: '/search/%q/0/7/0', hierEscapeChar: '%20' }, {}, 'html']);
		this._availableProviders.set('yts', [{ baseUrl: 'https://yts.ag', searchHierPart: '/api/v2/list_movies.json' }, { query_term: '%q', sort: 'seeds', order: 'desc', set: 1 }, 'json']);
	}

	/**
 * getter for provider map
 */

	_createClass(searchtorrents, [{
		key: 'getProvider',
		value: function getProvider(name) {
			return this._providers.get(name);
		}
	}, {
		key: 'isAvaliableProvider',
		value: function isAvaliableProvider(name) {
			return availableProviderNames.has(name);
		}

		/**
   * Constructs a provider based on parameters
   * providerClass - name of torrent provider, for instance: KickAss
   * baseUrl - the hier-part of the url with or w/ %q(uery) pattern
   */

	}, {
		key: 'providerFactory',
		value: function providerFactory(providerClass, urlParams, getParams, responseParams) {
			var myProviderObj = this.providers.get(providerClass);
			if (!myProviderObj && providerClazzDir[providerClass]) {
				myProviderObj = new providerClazzDir[providerClass](urlParams, getParams, responseParams);
				this.providers.set(providerClass, myProviderObj);
				return myProviderObj;
			}
			console.error('provider class was not found:' + providerClass);
		}

		/**
  * Initialises a provider if available, otherwise returns false
  */

	}, {
		key: 'initProvider',
		value: function initProvider(name) {
			if (this.availableProviders.has(name) && !this.providers.has(name)) {
				var actProvider = this.availableProviders.get(name);
				return this.providerFactory(name, actProvider[0], actProvider[1], actProvider[2]);
			} else {
				return false;
			}
		}
	}, {
		key: 'providers',
		get: function get() {
			return this._providers;
		}
	}, {
		key: 'availableProviders',
		get: function get() {
			return this._availableProviders;
		}
	}, {
		key: 'availableProviderNames',
		get: function get() {
			return this._availableProviders.keys();
		}
	}]);

	return searchtorrents;
})();

module.exports = searchtorrents;