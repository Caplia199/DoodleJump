// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"elbaT":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "4943a1030f289648";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"gNc1f":[function(require,module,exports,__globalThis) {
// --- Типы данных ---
// --- Утилиты ---
function lerp(a, b, t) {
    return a + (b - a) * t;
}
// --- Нейронная сеть ---
class NeuralNetwork {
    constructor(neuronCounts){
        this.levels = [];
        for(let i = 0; i < neuronCounts.length - 1; i++)this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
    }
    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        for(let i = 1; i < network.levels.length; i++)outputs = Level.feedForward(outputs, network.levels[i]);
        return outputs;
    }
    static replicate(network) {
        // Создаем новую сеть с такой же архитектурой
        const newNetwork = new NeuralNetwork(network.levels.map((l)=>l.inputs.length).concat(network.levels[network.levels.length - 1].outputs.length));
        // Глубоко копируем веса и смещения
        for(let i = 0; i < network.levels.length; i++){
            newNetwork.levels[i].biases = [
                ...network.levels[i].biases
            ];
            newNetwork.levels[i].weights = network.levels[i].weights.map((w)=>[
                    ...w
                ]);
        }
        return newNetwork;
    }
    static mutate(network, amount = 0.1) {
        network.levels.forEach((level)=>{
            for(let i = 0; i < level.biases.length; i++)level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
            for(let i = 0; i < level.weights.length; i++)for(let j = 0; j < level.weights[i].length; j++)level.weights[i][j] = lerp(level.weights[i][j], Math.random() * 2 - 1, amount);
        });
    }
}
class Level {
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);
        this.weights = Array.from({
            length: inputCount
        }, ()=>new Array(outputCount));
        Level.#randomize(this);
    }
    static #randomize(level) {
        for(let i = 0; i < level.inputs.length; i++)for(let j = 0; j < level.outputs.length; j++)level.weights[i][j] = Math.random() * 2 - 1;
        for(let i = 0; i < level.biases.length; i++)level.biases[i] = Math.random() * 2 - 1;
    }
    static feedForward(givenInputs, level) {
        level.inputs.splice(0, level.inputs.length, ...givenInputs);
        for(let i = 0; i < level.outputs.length; i++){
            let sum = 0;
            for(let j = 0; j < level.inputs.length; j++)sum += level.inputs[j] * level.weights[j][i];
            level.outputs[i] = sum > level.biases[i] ? 1 : 0; // Step activation
        }
        return level.outputs;
    }
}
// --- Класс трассы ---
class Track {
    constructor(width, height, level = 1){
        this.outer = [];
        this.inner = [];
        this.checkpoints = [];
        this.width = width;
        this.height = height;
        this.generateTrack(level);
        this.generateCheckpoints(level);
    }
    generateTrack(level) {
        if (level === 1) {
            // Уровень 1: Плавный овал
            this.outer = [
                {
                    x: 150,
                    y: 100
                },
                {
                    x: 650,
                    y: 100
                },
                {
                    x: 725,
                    y: 175
                },
                {
                    x: 750,
                    y: 300
                },
                {
                    x: 725,
                    y: 425
                },
                {
                    x: 650,
                    y: 500
                },
                {
                    x: 150,
                    y: 500
                },
                {
                    x: 75,
                    y: 425
                },
                {
                    x: 50,
                    y: 300
                },
                {
                    x: 75,
                    y: 175
                },
                {
                    x: 150,
                    y: 100
                }
            ];
            this.inner = [
                {
                    x: 250,
                    y: 200
                },
                {
                    x: 550,
                    y: 200
                },
                {
                    x: 625,
                    y: 250
                },
                {
                    x: 650,
                    y: 300
                },
                {
                    x: 625,
                    y: 350
                },
                {
                    x: 550,
                    y: 400
                },
                {
                    x: 250,
                    y: 400
                },
                {
                    x: 175,
                    y: 350
                },
                {
                    x: 150,
                    y: 300
                },
                {
                    x: 175,
                    y: 250
                },
                {
                    x: 250,
                    y: 200
                }
            ];
        } else if (level === 2) {
            // Уровень 2: Более извилистая трасса
            this.outer = [
                {
                    x: 100,
                    y: 100
                },
                {
                    x: 400,
                    y: 50
                },
                {
                    x: 700,
                    y: 100
                },
                {
                    x: 750,
                    y: 300
                },
                {
                    x: 700,
                    y: 500
                },
                {
                    x: 400,
                    y: 550
                },
                {
                    x: 100,
                    y: 500
                },
                {
                    x: 50,
                    y: 400
                },
                {
                    x: 150,
                    y: 300
                },
                {
                    x: 50,
                    y: 200
                },
                {
                    x: 100,
                    y: 100
                }
            ];
            this.inner = [
                {
                    x: 200,
                    y: 200
                },
                {
                    x: 350,
                    y: 150
                },
                {
                    x: 600,
                    y: 200
                },
                {
                    x: 650,
                    y: 300
                },
                {
                    x: 600,
                    y: 400
                },
                {
                    x: 450,
                    y: 450
                },
                {
                    x: 300,
                    y: 400
                },
                {
                    x: 250,
                    y: 350
                },
                {
                    x: 350,
                    y: 300
                },
                {
                    x: 250,
                    y: 250
                },
                {
                    x: 200,
                    y: 200
                }
            ];
        }
    }
    generateCheckpoints(level) {
        if (level === 1) this.checkpoints = [
            {
                x: 400,
                y: 150,
                radius: 30
            },
            {
                x: 650,
                y: 150,
                radius: 30
            },
            {
                x: 700,
                y: 300,
                radius: 30
            },
            {
                x: 650,
                y: 450,
                radius: 30
            },
            {
                x: 400,
                y: 450,
                radius: 30
            },
            {
                x: 150,
                y: 450,
                radius: 30
            },
            {
                x: 100,
                y: 300,
                radius: 30
            },
            {
                x: 150,
                y: 150,
                radius: 30
            }
        ];
        else if (level === 2) this.checkpoints = [
            {
                x: 400,
                y: 100,
                radius: 25
            },
            {
                x: 650,
                y: 150,
                radius: 25
            },
            {
                x: 700,
                y: 300,
                radius: 25
            },
            {
                x: 650,
                y: 450,
                radius: 25
            },
            {
                x: 400,
                y: 500,
                radius: 25
            },
            {
                x: 150,
                y: 450,
                radius: 25
            },
            {
                x: 100,
                y: 300,
                radius: 25
            },
            {
                x: 200,
                y: 225,
                radius: 25
            },
            {
                x: 400,
                y: 200,
                radius: 25
            },
            {
                x: 550,
                y: 300,
                radius: 25
            },
            {
                x: 450,
                y: 400,
                radius: 25
            },
            {
                x: 300,
                y: 325,
                radius: 25
            }
        ];
    }
}
// --- Класс машинки ---
class Car {
    constructor(x, y, angle, brain){
        this.alive = true;
        this.score = 0;
        this.timeAlive = 0;
        this.checkpointIndex = 0;
        this.laps = 0;
        this.width = 20;
        this.height = 30;
        this.maxSpeed = 5;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 0;
        this.brain = brain ? brain : new NeuralNetwork([
            2,
            6,
            1
        ]);
    }
    update(track) {
        if (!this.alive) return false;
        this.speed = 2.5;
        const nextCp = track.checkpoints[this.checkpointIndex % track.checkpoints.length];
        const distToCp = Math.hypot(this.x - nextCp.x, this.y - nextCp.y);
        const angleToCp = Math.atan2(nextCp.y - this.y, nextCp.x - this.x);
        let carAngleRelativeToCp = this.angle - angleToCp;
        while(carAngleRelativeToCp > Math.PI)carAngleRelativeToCp -= 2 * Math.PI;
        while(carAngleRelativeToCp < -Math.PI)carAngleRelativeToCp += 2 * Math.PI;
        const inputs = [
            distToCp / 300,
            carAngleRelativeToCp / Math.PI
        ];
        const outputs = NeuralNetwork.feedForward(inputs, this.brain);
        const turn = outputs[0] * 2 - 1;
        this.angle += 0.03 * turn;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.timeAlive++;
        this.checkCollision(track);
        return this.checkCheckpoints(track);
    }
    checkCollision(track) {
        if (!isPointInsideTrack(this, track)) this.alive = false;
    }
    checkCheckpoints(track) {
        if (!this.alive) return false;
        const nextCp = track.checkpoints[this.checkpointIndex % track.checkpoints.length];
        const distToCp = Math.hypot(this.x - nextCp.x, this.y - nextCp.y);
        if (distToCp < nextCp.radius) {
            this.checkpointIndex++;
            this.timeAlive = 0;
            if (this.checkpointIndex >= track.checkpoints.length) {
                this.laps++;
                this.checkpointIndex = 0;
                return true; // Lap completed
            }
        }
        return false; // Lap not completed
    }
    getFitness(track) {
        const nextCpIndex = this.checkpointIndex % track.checkpoints.length;
        const nextCp = track.checkpoints[nextCpIndex];
        const prevCpIndex = (this.checkpointIndex - 1 + track.checkpoints.length) % track.checkpoints.length;
        const prevCp = track.checkpoints[prevCpIndex];
        const totalCpDist = Math.hypot(nextCp.x - prevCp.x, nextCp.y - prevCp.y);
        const distToNextCp = Math.hypot(this.x - nextCp.x, this.y - nextCp.y);
        const progress = Math.max(0, totalCpDist - distToNextCp);
        let fitness = this.checkpointIndex * totalCpDist + progress;
        fitness -= this.timeAlive * 0.1;
        if (!this.alive) fitness -= 100;
        return fitness;
    }
    getCorners() {
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        const p1 = {
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y + Math.cos(this.angle - alpha) * rad
        };
        const p2 = {
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y + Math.cos(this.angle + alpha) * rad
        };
        const p3 = {
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        };
        const p4 = {
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        };
        return [
            p1,
            p2,
            p3,
            p4
        ];
    }
}
// --- Простейший ИИ ---
class SimpleAI {
    // На вход: сенсоры, на выход: {acc, turn}
    decide(sensors) {
        // Простая логика: если впереди свободно — газуем, иначе тормозим и поворачиваем
        const front = sensors[2];
        const left = sensors[1];
        const right = sensors[3];
        let acc = front > 0.3 ? 1 : -1;
        let turn = 0;
        if (left < right && left < 0.5) turn = 1;
        else if (right < left && right < 0.5) turn = -1;
        return {
            acc,
            turn
        };
    }
}
// --- Сенсоры ---
function getSensors(car, track) {
    const sensorAngles = [
        -90,
        -45,
        0,
        45,
        90
    ];
    const result = [];
    for (let a of sensorAngles){
        const angle = car.angle + a * Math.PI / 180;
        result.push(getDistanceToBoundary(car.x, car.y, angle, track));
    }
    return result;
}
function getDistanceToBoundary(x, y, angle, track) {
    // Луч до пересечения с границей (упрощённо: только внешняя граница)
    const rayLength = 200;
    let minDist = rayLength;
    for(let i = 0; i < track.outer.length - 1; i++){
        const p1 = track.outer[i];
        const p2 = track.outer[i + 1];
        const dist = lineIntersection(x, y, x + Math.cos(angle) * rayLength, y + Math.sin(angle) * rayLength, p1.x, p1.y, p2.x, p2.y);
        if (dist > 0 && dist < minDist) minDist = dist;
    }
    for(let i = 0; i < track.inner.length - 1; i++){
        const p1 = track.inner[i];
        const p2 = track.inner[i + 1];
        const dist = lineIntersection(x, y, x + Math.sin(angle) * rayLength, y - Math.cos(angle) * rayLength, p1.x, p1.y, p2.x, p2.y);
        if (dist > 0 && dist < minDist) minDist = dist;
    }
    return minDist / rayLength;
}
function lineIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) return -1;
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        const x = x1 + t * (x2 - x1);
        const y = y1 + t * (y2 - y1);
        return Math.sqrt((x - x1) ** 2 + (y - y1) ** 2);
    }
    return -1;
}
function pointInPolygon(point, polygon) {
    let isInside = false;
    for(let i = 0, j = polygon.length - 1; i < polygon.length; j = i++){
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;
        const intersect = yi > point.y !== yj > point.y && point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi;
        if (intersect) isInside = !isInside;
    }
    return isInside;
}
function isPointInsideTrack(car, track) {
    // Проверяем все 4 угла машины
    for (const corner of car.getCorners()){
        if (!pointInPolygon(corner, track.outer) || pointInPolygon(corner, track.inner)) return false;
    }
    return true;
}
// --- Основная логика ---
class Game {
    constructor(canvas){
        this.cars = [];
        this.bestCar = null;
        this.populationSize = 1;
        this.currentCarIndex = 0;
        this.running = false;
        this.animationId = 0;
        this.generation = 1;
        this.currentLevel = 1;
        this.totalLaps = 0;
        this.startTime = 0;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.track = new Track(canvas.width, canvas.height, this.currentLevel);
        this.initUI();
    }
    initUI() {
        document.getElementById('start-btn').addEventListener('click', ()=>this.start());
        document.getElementById('reset-btn').addEventListener('click', ()=>this.resetGame());
    }
    start() {
        if (this.running) return;
        document.getElementById('start-btn').style.display = 'none';
        document.getElementById('reset-btn').style.display = 'inline-block';
        this.resetGame(false); // Не сбрасываем localStorage при старте
    }
    resetGame(clearLocalStorage = true) {
        this.running = false;
        if (this.animationId) cancelAnimationFrame(this.animationId);
        this.currentLevel = 1;
        this.generation = 1;
        this.totalLaps = 0;
        this.startTime = Date.now();
        if (clearLocalStorage) localStorage.removeItem("bestBrain_level" + this.currentLevel);
        this.track = new Track(this.canvas.width, this.canvas.height, this.currentLevel);
        this.cars = this.createInitialPopulation();
        this.currentCarIndex = 0;
        const storedBrain = localStorage.getItem("bestBrain_level" + this.currentLevel);
        if (storedBrain) {
            console.log("Loading brain from localStorage for level", this.currentLevel);
            const bestBrain = JSON.parse(storedBrain);
            this.cars[0].brain = bestBrain;
            this.bestCar = this.cars[0];
        }
        this.running = true;
        this.animate();
    }
    createInitialPopulation() {
        const cars = [];
        const startPos = this.getStartPosition();
        for(let i = 0; i < this.populationSize; i++)cars.push(new Car(startPos.x, startPos.y, startPos.angle));
        this.currentCarIndex = 0;
        return cars;
    }
    nextGeneration() {
        this.generation++;
        const bestCarOfLastGeneration = this.cars.reduce((a, b)=>a.getFitness(this.track) > b.getFitness(this.track) ? a : b);
        if (bestCarOfLastGeneration) {
            this.bestCar = new Car(0, 0, 0, bestCarOfLastGeneration.brain);
            localStorage.setItem("bestBrain_level" + this.currentLevel, JSON.stringify(bestCarOfLastGeneration.brain));
            this.cars = this.createInitialPopulation();
            this.cars[0].brain = NeuralNetwork.replicate(bestCarOfLastGeneration.brain);
            NeuralNetwork.mutate(this.cars[0].brain, 0.2);
        } else this.cars = this.createInitialPopulation();
        this.currentCarIndex = 0;
    }
    animate() {
        if (!this.running) return;
        const currentCar = this.cars[this.currentCarIndex];
        const lapCompleted = currentCar.update(this.track);
        if (lapCompleted) {
            this.running = false; // Pause the game
            this.showLevelCompleteBanner(()=>{
                this.nextLevel(currentCar.brain);
                this.running = true;
                this.animate();
            });
            return;
        }
        if (!currentCar.alive) {
            this.currentCarIndex++;
            if (this.currentCarIndex >= this.cars.length) this.nextGeneration();
        }
        this.updateUI();
        this.render();
        this.animationId = requestAnimationFrame(()=>this.animate());
    }
    getStartPosition() {
        if (this.currentLevel === 1) return {
            x: 170,
            y: 150,
            angle: 0
        };
        else if (this.currentLevel === 2) return {
            x: 150,
            y: 150,
            angle: 0
        };
        throw new Error("Invalid level");
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderTrack();
        if (this.currentCarIndex >= this.cars.length) return;
        const currentCar = this.cars[this.currentCarIndex];
        this.ctx.save();
        this.track.checkpoints.forEach((cp, index)=>{
            const nextCpIndex = currentCar.checkpointIndex % this.track.checkpoints.length;
            this.ctx.beginPath();
            this.ctx.arc(cp.x, cp.y, cp.radius, 0, Math.PI * 2);
            this.ctx.lineWidth = 2;
            if (index < currentCar.checkpointIndex) {
                this.ctx.strokeStyle = "rgba(0, 255, 0, 0.8)";
                this.ctx.fillStyle = "rgba(0, 255, 0, 0.3)";
            } else if (index === nextCpIndex) {
                this.ctx.strokeStyle = "rgba(255, 255, 0, 1)";
                this.ctx.fillStyle = "rgba(255, 255, 0, 0.4)";
            } else {
                this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
                this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
            }
            this.ctx.stroke();
            this.ctx.fill();
            this.ctx.fillStyle = "white";
            this.ctx.font = "12px Arial";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(index.toString(), cp.x, cp.y);
        });
        this.ctx.restore();
        this.ctx.globalAlpha = 0.2;
        this.cars.forEach((car)=>{
            if (car.alive) this.renderCar(car);
        });
        this.ctx.globalAlpha = 1;
        if (currentCar && currentCar.alive) this.renderCar(currentCar);
    }
    renderTrack() {
        this.ctx.save();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 5;
        this.ctx.fillStyle = '#888'; // Цвет дороги
        // Рисуем внешнюю и внутреннюю границы и заливаем пространство между ними
        this.ctx.beginPath();
        this.ctx.moveTo(this.track.outer[0].x, this.track.outer[0].y);
        for (const p of this.track.outer)this.ctx.lineTo(p.x, p.y);
        this.ctx.closePath();
        this.ctx.moveTo(this.track.inner[0].x, this.track.inner[0].y);
        for (const p of this.track.inner)this.ctx.lineTo(p.x, p.y);
        this.ctx.closePath();
        this.ctx.fill('evenodd');
        // Рисуем белые линии границ
        this.ctx.beginPath();
        this.ctx.moveTo(this.track.outer[0].x, this.track.outer[0].y);
        for (const p of this.track.outer)this.ctx.lineTo(p.x, p.y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(this.track.inner[0].x, this.track.inner[0].y);
        for (const p of this.track.inner)this.ctx.lineTo(p.x, p.y);
        this.ctx.stroke();
        // Рисуем стартовую линию
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 10;
        this.ctx.setLineDash([
            10,
            10
        ]);
        this.ctx.beginPath();
        if (this.currentLevel === 1) {
            this.ctx.moveTo(200, 100);
            this.ctx.lineTo(200, 200);
        } else if (this.currentLevel === 2) {
            this.ctx.moveTo(150, 100);
            this.ctx.lineTo(150, 200);
        }
        this.ctx.stroke();
        this.ctx.restore();
    }
    renderCar(car) {
        this.ctx.save();
        this.ctx.translate(car.x, car.y);
        this.ctx.rotate(car.angle);
        this.ctx.fillStyle = car.alive ? '#3498db' : '#e74c3c';
        this.ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
        this.ctx.restore();
    }
    updateUI() {
        document.getElementById('level').textContent = this.currentLevel.toString();
        document.getElementById('generation').textContent = this.generation.toString();
        const bestCarOfLastGeneration = this.cars.reduce((a, b)=>a.getFitness(this.track) > b.getFitness(this.track) ? a : b);
        document.getElementById('best-score').textContent = bestCarOfLastGeneration.getFitness(this.track).toFixed(0);
        if (this.currentCarIndex < this.cars.length) {
            const currentCar = this.cars[this.currentCarIndex];
            if (currentCar) document.getElementById('score').textContent = currentCar.getFitness(this.track).toFixed(0);
        }
        document.getElementById('laps-completed').textContent = this.totalLaps.toString();
        const elapsedTime = Math.floor((Date.now() - this.startTime) / 1000);
        document.getElementById('total-time').textContent = `${elapsedTime}\u{441}`;
    }
    showLevelCompleteBanner(callback) {
        const banner = document.getElementById('level-complete-banner');
        banner.style.display = 'block';
        setTimeout(()=>{
            banner.style.display = 'none';
            callback();
        }, 3000); // Show for 3 seconds
    }
    nextLevel(fittestBrain) {
        this.totalLaps++;
        this.currentLevel++;
        this.generation = 1;
        if (this.currentLevel > 2) {
            alert("\u041F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u044F\u0435\u043C! \u0412\u044B \u043F\u0440\u043E\u0448\u043B\u0438 \u0432\u0441\u0435 \u0443\u0440\u043E\u0432\u043D\u0438!");
            this.resetGame(true);
            return;
        }
        localStorage.setItem("bestBrain_level" + this.currentLevel, JSON.stringify(fittestBrain));
        this.track = new Track(this.canvas.width, this.canvas.height, this.currentLevel);
        this.cars = this.createInitialPopulation();
        this.cars[0].brain = NeuralNetwork.replicate(fittestBrain);
        NeuralNetwork.mutate(this.cars[0].brain, 0.3);
        this.currentCarIndex = 0;
        this.bestCar = this.cars[0];
    }
}
// --- Запуск ---
document.addEventListener('DOMContentLoaded', ()=>{
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        const game = new Game(canvas);
    }
});

},{}]},["elbaT","gNc1f"], "gNc1f", "parcelRequiref649", {})

//# sourceMappingURL=macqueen.0f289648.js.map
