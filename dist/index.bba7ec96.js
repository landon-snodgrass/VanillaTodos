// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
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

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
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
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

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

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"kQHBL":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "89a4cf30bba7ec96";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
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
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
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
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"gtBE5":[function(require,module,exports) {
var _todoListJs = require("./modules/TodoList.js");
// Add todo is broken with firebase because it's adding it at "current index" which is instantiated to 0
// Firebase stuff
const firebaseConfig = {
    apiKey: "AIzaSyAecJFhhNfMEXELKimn0qtlRx9afu3RPuM",
    authDomain: "vanilla-todos-a3f87.firebaseapp.com",
    databaseURL: "https://vanilla-todos-a3f87-default-rtdb.firebaseio.com",
    projectId: "vanilla-todos-a3f87",
    storageBucket: "vanilla-todos-a3f87.appspot.com",
    messagingSenderId: "1029295568455",
    appId: "1:1029295568455:web:fc5117c71b14134cd2a362"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const uncheckedIconClass = "far fa-circle";
const checkedIconClass = "fas fa-circle";
let todoList;
document.addEventListener("DOMContentLoaded", ()=>{
    todoList = new _todoListJs.TodoList();
    todoList.loadTodoList();
    const todoInput = document.getElementById('todo-text');
    const addTodoButton = document.getElementById('add-todo-button');
    addTodoButton.addEventListener("click", addTodoClick);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + "/" + yyyy;
    document.getElementById('todays-date').innerHTML = today;
    document.addEventListener('keydown', (event)=>{
        const activeEl = document.activeElement;
        if (todoInput == activeEl && event.key == "Enter") addTodoEnter(todoInput);
    });
});
const addTodoEnter = (todoInput)=>{
    const edit = todoInput.getAttribute("edit");
    const todoText = todoInput.value;
    if (todoText == "") {
        console.log("Error");
        return;
    }
    if (edit && edit != "") todoList.deleteTodo(edit);
    todoList.addTodo(todoText);
    todoInput.value = "";
};
const addTodoClick = (event)=>{
    const edit = event.target.getAttribute("edit");
    const todoText = document.getElementById("todo-text").value;
    if (todoText == "") {
        console.log("Error");
        return;
    }
    if (edit && edit != "") todoList.deleteTodo(edit);
    todoList.addTodo(todoText);
    document.getElementById("todo-text").value = "";
};

},{"./modules/TodoList.js":"dQcYM"}],"dQcYM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TodoList", ()=>TodoList
);
var _todoJs = require("./Todo.js");
class TodoList {
    constructor(){
        this.todoList = [];
        this.element = document.getElementById("todo-list");
        this.currentIndex = 0;
        this.currentPosition = 0;
        this.currentDragElement = null;
    }
    sortList() {
        this.todoList.sort((a, b)=>{
            return a.position - b.position;
        });
    }
    refreshListDisplay() {
        console.log("Refresh display ", this.todoList);
        this.element.innerHTML = "";
        this.sortList();
        this.todoList.forEach((todo)=>{
            this.element.appendChild(todo.element);
        });
        this.saveTodoList();
    }
    todoDragEnter(underTodoId) {
        const overTodoId = _todoJs.Todo.convertElementIdToId(this.currentDragElement.id);
        const underTodo = this.getTodo(underTodoId);
        const overTodo = this.getTodo(overTodoId);
        if (Math.abs(underTodo.position - overTodo.position) > 1) // This is that weird bug where the dragenter event of a todo two spots above fires
        return;
        this.reorderList(underTodo, overTodo);
    }
    reorderList(underTodo, overTodo) {
        if (overTodo.position == underTodo.position) ;
        else {
            // We're in a different spot
            if (overTodo.position < underTodo.position) {
                overTodo.position = underTodo.position;
                underTodo.position = overTodo.position - 1;
                this.setTodo(overTodo.id, overTodo);
                this.setTodo(underTodo.id, underTodo);
                this.refreshListDisplay();
            } else if (overTodo.position > underTodo.position) {
                overTodo.position = underTodo.position;
                underTodo.position = overTodo.position + 1;
                this.setTodo(overTodo.id, overTodo);
                this.setTodo(underTodo.id, underTodo);
                this.refreshListDisplay();
            } else console.log("I, the auspicious developer, does not know why this console log has happened. It should theoretically be impossible for this line of code to run.");
        }
    }
    setTodo(todoId, newTodoData) {
        this.todoList.forEach((todo)=>{
            if (todo.id == todoId) {
                todo = newTodoData;
                return;
            }
        });
        this.saveTodoList();
    }
    addTodo(todoText) {
        let newTodo = new _todoJs.Todo(todoText, this, this.currentPosition);
        this.todoList[this.currentIndex] = newTodo;
        this.currentPosition++;
        this.element.appendChild(newTodo.element);
        document.getElementById("todo-text").setAttribute("edit", "");
        document.getElementById("add-todo-button").setAttribute("edit", "");
        this.saveTodoList();
    }
    loadTodo(todoText1, todoIndex, todoPosition, todoChecked) {
        let newTodo = new _todoJs.Todo(todoText1, todoIndex, this, todoPosition, todoChecked);
        this.todoList[todoIndex] = newTodo;
        console.log(newTodo);
    }
    deleteTodo(todoId1) {
        this.todoList[todoId1].getTodoElement().remove();
        delete this.todoList[todoId1];
        this.saveTodoList();
    }
    editTodo(todoId2) {
        document.getElementById("todo-text").value = this.todoList[todoId2].text;
        document.getElementById("todo-text").setAttribute("edit", todoId2);
        document.getElementById("add-todo-button").setAttribute("edit", todoId2);
        this.saveTodoList();
    }
    // Can overload with other stuff
    getTodo(todoId3) {
        let retTodo = null;
        this.todoList.forEach((todo)=>{
            if (todo.id == todoId3) {
                retTodo = todo;
                return;
            }
        });
        return retTodo;
    }
    saveTodoList() {
        let todoListJson = {
        };
        this.todoList.forEach((todo)=>{
            todoListJson[todo.id] = todo.toJson();
        });
        const saveJson = {
            "testTodoList": todoListJson
        };
        // Send saveJson off to firebase
        db.ref('testTodoList/').set(saveJson);
        const saveJsonString = JSON.stringify(saveJson);
        window.localStorage.clear();
        window.localStorage.setItem("todo-list", saveJsonString);
    }
    loadTodoList() {
        const newTodoListData = JSON.parse(window.localStorage.getItem("todo-list"));
        if (newTodoListData) {
            console.log(newTodoListData);
            const newTodoList = newTodoListData["testTodoList"];
            for(const todo in newTodoList)this.loadTodo(newTodoList[todo].text, todo, newTodoList[todo].position, newTodoList[todo].checked);
            this.refreshListDisplay();
        }
    }
}

},{"./Todo.js":"cYSwn","@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"cYSwn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Todo", ()=>Todo
);
class Todo {
    constructor(todoText, parentTodoList, position, checked = false){
        const id = Date.now();
        this.parentTodoList = parentTodoList;
        this.completed = checked;
        this.text = todoText;
        this.id = id;
        this.position = position;
        const todoClassList = this.completed ? "todo-item checked" : "todo-item";
        const iconClassList = this.completed ? "fas fa-circle todo-item-checkbox" : "far fa-circle todo-item-checkbox";
        // Creating the li container
        this.element = document.createElement("li");
        this.element.classList = todoClassList;
        this.element.id = `todo-item-${id}`;
        this.element.setAttribute("draggable", "true");
        // Creating the checkbox
        this.checkbox = document.createElement("a");
        this.checkbox.classList += "todo-check text-danger";
        this.checkbox.id = `todo-check-${id}`;
        this.checkbox.dataset.id = `${id}`;
        this.checkbox.innerHTML = `<i class="${iconClassList}" id="todo-item-checkbox-${id}"></i>`;
        // Creating the text
        this.todoText = document.createElement("span");
        this.todoText.classList += "todo-item-text";
        this.todoText.innerHTML = todoText;
        // Creating the controls 
        this.controls = document.createElement("span");
        this.controls.classList += "controls";
        // Creating the delete button
        this.deleteButton = document.createElement("a");
        this.deleteButton.classList += "delete-todo";
        this.deleteButton.href = "#";
        this.deleteButton.dataset.id = `${id}`;
        this.deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        // Creating the edit button
        this.editButton = document.createElement("a");
        this.editButton.classList += "edit-todo";
        this.editButton.href = "#";
        this.editButton.dataset.id = `${id}`;
        this.editButton.innerHTML = `<i class="fas fa-edit"></i>`;
        // Putting it all together
        this.controls.appendChild(this.deleteButton);
        this.controls.appendChild(this.editButton);
        // Event listeners
        this.checkbox.addEventListener("click", ()=>{
            this.checkUncheck();
        });
        this.deleteButton.addEventListener("click", ()=>{
            this.parentTodoList.deleteTodo(this.id);
        });
        this.editButton.addEventListener("click", ()=>{
            this.parentTodoList.editTodo(this.id);
        });
        this.element.appendChild(this.checkbox);
        this.element.appendChild(this.todoText);
        this.element.appendChild(this.controls);
        // Switching the listeners to that actual todo object
        // there's still a weird bug where the first todo gets it's dragenter
        // event called when you drag the 3rd one so I have to fix that
        this.element.addEventListener("dragstart", (event)=>{
            this.parentTodoList.currentDragElement = this.element;
            this.element.style = "opacity: 0.3";
        });
        this.element.addEventListener("dragend", (event)=>{
            this.parentTodoList.currentDragElement = null;
            this.element.style = "opacity: 1";
        });
        this.element.addEventListener("dragenter", (event)=>{
            this.parentTodoList.todoDragEnter(this.id);
        }, false);
        this.element.addEventListener("dragover", (event)=>{
            event.preventDefault();
        }, false);
    }
    getTodoElement = ()=>this.element
    ;
    getCheckbox = ()=>this.checkbox
    ;
    getCheckboxIcon = ()=>this.checkbox.querySelector("i")
    ;
    checkUncheck = ()=>{
        this.completed = !this.completed;
        const classList = this.completed ? "todo-item checked" : "todo-item";
        const iconClassList = this.completed ? "fas fa-circle" : "far fa-circle";
        this.getTodoElement().classList = classList;
        this.getCheckboxIcon().classList = iconClassList;
    };
    toJson = ()=>{
        return {
            "position": this.position,
            "text": this.text,
            "checked": this.completed
        };
    };
    static convertElementIdToId(elementId) {
        const charArray = elementId.split('');
        return charArray[charArray.length - 1];
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["kQHBL","gtBE5"], "gtBE5", "parcelRequire35e6")

//# sourceMappingURL=index.bba7ec96.js.map
