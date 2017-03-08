webpackJsonp([4],{

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(343)

var Component = __webpack_require__(316)(
  /* script */
  __webpack_require__(324),
  /* template */
  __webpack_require__(338),
  /* scopeId */
  "data-v-55ef7f1c",
  /* cssModules */
  null
)
Component.options.__file = "e:\\ihm\\App-Services-RD\\vue-router-demo\\js\\views\\chat-detail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] chat-detail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55ef7f1c", Component.options)
  } else {
    hotAPI.reload("data-v-55ef7f1c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 316:
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(318)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = { css: css, media: media, sourceMap: sourceMap }
    if (!newStyles[id]) {
      part.id = parentId + ':0'
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      part.id = parentId + ':' + newStyles[id].parts.length
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
  var hasSSR = styleElement != null

  // if in production mode and style is already provided by SSR,
  // simply do nothing.
  if (hasSSR && isProduction) {
    return noop
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = styleElement || createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (!hasSSR) {
    update(obj)
  }

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 318:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {};

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(87)();
// imports


// module
exports.push([module.i, "\n.bg[data-v-55ef7f1c]{\n\twidth: 100%;\n\theight: 100%;\n\tbackground: url(" + __webpack_require__(334) + ") no-repeat;\n\tbackground-size: 100% auto;\n}\n.back[data-v-55ef7f1c]{\n\t\n\tcolor: #fff;\n}\np[data-v-55ef7f1c]{color: #fff; font-size: 16px;height: 32px; line-height: 32px; text-indent: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/bg1.jpg?039690a6ba3a56ab4ead024899f45d9b";

/***/ }),

/***/ 335:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAAB5CAMAAACX6epLAAABMlBMVEUAa78AcscAcsUAcscAc8cAccYAcsYAcsYAdMgAcsMAcscYA2QAb8QAcsYAYbcAc8cAb8YAcscAbL8AdMgAaMAAYrUAcscAccYAccUAcscAbsIAcscAccUAdMcAcscAcMUAbMIARZgAarwAc8cAccYAL3QAdccAcMYAcMYAUJ8AbsAAaboAcsYAZbkAZrgAcsYAcMYAcMQAb8IAWKcAbsMAVKsAcsgAcccAXK4AcsYAcsYAdMEAccYAccgAcsUAdMQAZrsAcsUAb8X/ZRgAbsEAbb//ZBcAbMYAa73+Yxf8YhT+ZBj/ZBj8Yhf/YhPpTAX/ZRj9YBL9ZBX+YhT5XBL4Wgj2WAAXcLUWcLT9ZBn9Yhj6YhTzUwAZcrUEcr75XxIAdMj/ZxsAdMYAcscAcsj/ZRicG5ejAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfhAg0WCSxi1+FSAAAD3klEQVR42u2cTW/iMBCGnRI+GinKIVJK1VAOVAsHpOW0iKqAFqRKpa2E2kM/pF05Mfz/v7DQst00deIx9rquNO+xTF4/TcYTM04gJKf72wVR1mDaHqi7HLQPSz+/mSc7Xe7P/MNj9EWs1t3bZOrsTKhb5UfcvrG+aP601zidFc0q2Mukn74zCXsfQ5ZJXnP5cY4ZzSk9ks8kN29CG7mQxTr5qPWV5EAnlKOWpEnAM0nH2ZBnHu02haUGcilfjkzmswKTi0zaJkW60UC70XegRZcVWqwO3qLWhbjJHZi2RssEOcMjVubA/obNi2mTNZT2nArkl0+6s4bQ4DXwKinTNRA3pWL5UUHd73uAo2lXlApbKcxnXgr6nX62jA7i0xoDHku3BzyV0wKrA5XUiqWMyR4UCzIXnL0TakInm5ESkSDLh4YRXFpWc2Vq78oM7lhQF6C1wQwt7ZNLIe7cHtwquRbiAkrZ2BBuADi7gNJwYAjX0ZMM5nC1TDVzuAsdhcwcrvg2cW8V7lLDTdgg7p2GJY5BXJKoLyBN4j6rrx9N4mr48mMUt+z7xMJC3PtCXmBjxCwuv4kDpzWNy8+HNbjJYByXs9RZSnRijeOS3Mp3fkvsxiXkavmaE+u5TG/s03AJOXv89fDw+Fu6Lf8ZuNG/HiILbMfNtelpzWbcmNOSi6zFDQqbPDbiVgo+Dq3ELe52tizEjUv7JtbhlvZZD/Xg+o4viEi9CgjXgewIqOLWt2EXR0Ht4/4Q8+tRc7uFfAjCFYQM9eFmevy96bDdG8/e/RGEGwlCWv8DlysQrnDLZmc2PA8aYeZSMrdWqXZ7pnGFMd/aI69sNrpOPzKG+9NMCdKFG30t3M7Xwq1/LdwK4iIu4iIu4iIu4iIu4iIu4iIu4iIu4iIu4iIu4oLlO8fx7i2CWbtbbTBrcVllwn3OeBRaiOuU7a5NQqtwU/FWVWARLrNpowpxERdxERdxERdxEVfTiswU7hiAK36ewRUPNBCadLS8bPydVIUxoY6BqlpwR6Sp5cQITZpacGNADOQHTVyRCehRSh/gwnSMFKhXl41OAS6B+kwTT2rQTBNe6QAQA/txG0E2zIgOl5cYT8NlJF3l4iJ6kvjtacyVYDKqnxjwM/c+wGVUEuJBB5qJcg6mVdk9YidPbZ696ri4tSbxBsYRJKF8tcTdvSei/i+XFKp3LjUNAxWMJGlSUHxzLrylQ0P2TaUJ55ZTkTUhzRTikk8I94LIKz8L2JDocOGh9BqZaRnGZD/VM2fYb+5pQpwU4jKNKi0/9KpnREG90cak5Z3GKiZkPKprcEGhUHvpDyk8KJYX42E6AAAAAElFTkSuQmCC"

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', {
    staticClass: "bg"
  }, [_c('p', [_c('a', {
    staticClass: "back",
    attrs: {
      "href": "javascript:;"
    },
    on: {
      "click": function($event) {
        _vm.$router.go(-1)
      }
    }
  }, [_vm._v("back")])]), _c('p', [_vm._v("聊天id:" + _vm._s(_vm.$route.params.id))]), _c('img', {
    staticStyle: {
      "border": "1px solid #fff"
    },
    attrs: {
      "width": "50",
      "src": __webpack_require__(335)
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-55ef7f1c", module.exports)
  }
}

/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(331);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(317)("9ac11026", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/.npminstall/css-loader/0.26.2/css-loader/index.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-55ef7f1c\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/selector.js?type=styles&index=0!./chat-detail.vue", function() {
     var newContent = require("!!../../node_modules/.npminstall/css-loader/0.26.2/css-loader/index.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-55ef7f1c\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/selector.js?type=styles&index=0!./chat-detail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});