(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios'), require('node-rsa')) :
    typeof define === 'function' && define.amd ? define(['exports', 'axios', 'node-rsa'], factory) :
    (global = global || self, factory(global.lightningWeb = {}, global.Axios, global.NodeRSA));
}(this, (function (exports, Axios, NodeRSA) { 'use strict';

    Axios = Axios && Axios.hasOwnProperty('default') ? Axios['default'] : Axios;
    NodeRSA = NodeRSA && NodeRSA.hasOwnProperty('default') ? NodeRSA['default'] : NodeRSA;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var createRSA = function () {
        var RSA = {
            priateKey: null,
            publicKey: null,
            init: function (keyData) {
                var _a = keyData.split('-----END PUBLIC KEY-----'), a = _a[0], b = _a[1];
                a += "-----END PUBLIC KEY-----";
                RSA.publicKey = new NodeRSA({ b: 512 });
                RSA.priateKey = new NodeRSA({ b: 512 });
                RSA.publicKey.importKey(a, 'public');
                RSA.priateKey.importKey(b, 'private');
            },
            createKeys: function () {
                var key = new NodeRSA({ b: 512 });
                var out = '';
                out += key.exportKey('public');
                out += key.exportKey('private');
                return out;
            },
            decode: function (text) {
                if (!RSA.publicKey) {
                    return text;
                }
                return RSA.publicKey.decryptPublic(text, 'utf8');
            },
            encode: function (text) {
                if (typeof text !== 'string') {
                    text = JSON.stringify(text);
                }
                if (!RSA.publicKey) {
                    return text;
                }
                return RSA.priateKey.encryptPrivate(text, 'base64');
            },
        };
        return RSA;
    };

    var Lightning = function (params) {
        var url = params.url, keys = params.keys, _a = params.config, config = _a === void 0 ? {} : _a;
        var RSA = createRSA();
        if (keys) {
            RSA.init(keys);
        }
        var lightning = function (data) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (cb) {
                        Axios.post(url, { code: RSA.encode(data) }, __assign(__assign({}, config), { headers: __assign({ 'content-type': 'application/json' }, config.headers) }))
                            .then(function (res) {
                            if (res.data) {
                                if (res.data.code) {
                                    return cb(RSA.decode(res.data.code));
                                }
                                return cb(res.data);
                            }
                            return res;
                        })
                            .catch(function (err) { return cb(err.response ? err.response.data : err); });
                    })];
            });
        }); };
        return lightning;
    };

    exports.Lightning = Lightning;
    exports.createRSA = createRSA;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
