webpackJsonp([2],{

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(390)

var Component = __webpack_require__(318)(
  /* script */
  __webpack_require__(358),
  /* template */
  __webpack_require__(384),
  /* scopeId */
  "data-v-4cabd673",
  /* cssModules */
  null
)
Component.options.__file = "e:\\ihm\\App-Services-RD\\vue-router-demo\\js\\views\\find.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] find.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4cabd673", Component.options)
  } else {
    hotAPI.reload("data-v-4cabd673", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 318:
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

/***/ 319:
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

var listToStyles = __webpack_require__(337)

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

/***/ 320:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAsCAYAAAB/nHhDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzE5RUFGQTg5MkE2MTFFNkI4NThCM0Y2RDQ5RjBDMzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzE5RUFGQTk5MkE2MTFFNkI4NThCM0Y2RDQ5RjBDMzkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMTlFQUZBNjkyQTYxMUU2Qjg1OEIzRjZENDlGMEMzOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMTlFQUZBNzkyQTYxMUU2Qjg1OEIzRjZENDlGMEMzOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjLzu5kAAAJ8SURBVHjatJdPSFRRFMZnMkqDFkKLlrmxtatWmWZ/0AyipkByEUkIVlaEGCE6g0QiUVGKlgnSpggLC1MjMsUkUJFwYS1qUQsTi8LKElGe34Fv5DRNznvzzhz48eZcZr7vvbnvnHtv0HGcQCojqA0i4TrfeqAJjNeFI+0ysMbyZsENUAHacLPHrQ2ugVPKLN/S4Co4o/IH4JiVQSM4p/JOcBRzsGRhcBlUqfwRxRejA34M6sEFlT8GJRBf0F9K1iAMalT+FByJFU/WoBbogukFB8FCvC97Nbgo9ajyZ6uJezWoBpdU/pzi86v9yK3BedCg8n5wAPxO9EM3BmfBFZUPgv1uxN0YVLJKozEE9rkVT2RwElxnX5EYpvicl7fifwbl4KYSf03xn17f6XgGZaBFiY+AQjCbTEXGGkgPb1PiY2BPsuJ/GWCBkPZ6W4mP+xVfMYB4KS53QBrH31D8u99enhYMOCW43lXiE2A3+OpVLC8vP+4ThJS4xHqwzmodFQN5gm41tpUFtcXEgD38EDihumIWW0K29b6oCJeHIJ1D06AATLoRw80mrIMeUKx6zWY+SY7vOlDxAuwFP5hv4tg2KwOJV2CXqoNMLjDbrQwkRsFO8IX5RtDHGjExiFb0DvCZ+QbwhPNkYiDxFuSCT8zT+aaFrAwk3tPkA3Op9Pug1MpA4iNN3kX7GOhggZoYSExxTiaUyS1w2spAYoZ7/7GYg0e1lYHEN9bJsBprQKuJWBkEuNJJxb/U+1aYNFofAjP42haqsWaZFzQ/x+KE84fbyK6YPVWr5RlN1pHDrA0JOT4NyIe1hqfMRRbeL2nx+Hvu/TMHKT/ppyKWBRgAlB+iVuksQrcAAAAASUVORK5CYII="

/***/ }),

/***/ 321:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 322:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 323:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 324:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 325:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 326:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABGdBTUEAALGPC/xhBQAABHFJREFUaAXtWVtoHFUY/v7ZC4k3KtYLja1NLEVIKYqgYBSq6IutaFoWmwdBpGoefLAUHwQfAqLoi2BUkIJo9SHIut2IoA8tIiihDxZLHqSluWxjNjcU4yXdbnZnfv8Zu2U3sztzzlzsCnsgmTPnfOf//u9c5/wLdFKnBzo90OmBuh6gunykWc5kEqie2ge29ojh++Vvp0PAzPJcBug0CCdxy205Onr6olMXwb/IBfEL96awsjwsQg6Lf70KPv4Jg97HdTe9SZ9NringPSGRCuID2/pgmmNgvs+TtWklFWEkDlJ+7oem1YqFkQni/dsGYFa/Ft4bFLndMKKKTMNDlC9+6q5UK4lEkIxMP6rm9wDfqEbrgSKYYAzSlwtfeaBaVoUWJGvmGqws/ixO3NGSRb9iDZTeReOFgm5TQ7eBC7+y9GrEYmyKa4H1D11cCgWhRogPbt2CkjUtU61LgSsIZECm3oROw3AjVLaejlGMHFV4SUeMjQ0niJHRJdTD0+M8MqLlY+Apx5n+NNZ/vyQOBrahJI7oHhovnlHCCkhLfYPRytoWeY9XjE1I1NfA6/MSXJBh9fjYjqaaoXW2BRdkVu2PzPgTWVo8wQUZ9Gv8amwGY0GHJ7ig5ANy/iD017Gvs8nEOV9MHSCwIMpmTbEj328xJqIZyl6Y1WEILMghScg9Js7ElNM1H05Qbl6uC6Q1JZQdtK8SabyrjL8MDCWIiBgGv61Lqogfpex8URF7BRZKkG2F8gsfy+F37IrFaDJnsSn1WhBToQU5pFu7XxRpp4I44GpDtIhkci99UrA/q7RTJILovakyjK4nZaS+1fagvgHRNFKJRyk3N1NfrJOP9FtMIlSEp3qOiLA3JFCS1nFE2nwOpIbllrqq1W4DOLnhPdzroER9DJRg8Xkx1K9kjGCBjMOUnx9VwvuAQo+QE1NYXnrGuYwx7/Lh86imKbExhu70BzQ2K4HIYCmwIH52exdWK69IPEECihFEe2r+E5UkexSp1FuULSzVilWfgQTx/p69MlFGZZ30qRJp44j+kJ3zCI3Pf6TTVkvQv2HexXdkVLTv+jpONWAJJ2TDGJLg428N5S1elAXxUO+tKJW/EDEPtrAVX7G9nSdS+yhXOOtHoiTIEXOx/J0Yu8vPYGz1RKtIGI9R7pcfvTh8D1Ye2rkZpfWTV1WMrYB5k4Sbv+ED2z071VOQ8xtP6e/jYizEduzVn9p1m2FWTnBmx82tWnoKQmXidVkzD7VqfFXKmW9HpXTM+Spp4kDLNcSDPY/IiW9PtZaYJvb+uyIyXpYt3XVfauqsM9UqE2faaKo166i/YHTvoPz0Sn1l8ym3PnGozcXYGq4HXxqpF2PnXSPEI3uS+On8BdlW7Mhou6cq0l13UnZmruaoe4Qmp574n4ixNSRRKT9fE2M/3YIsa7ge0PZ5xnPOrLrsqFsQcHfbi2hwUJbG5OzuWpH7gpcyBlDFw7IpBP81u2Y9/qcpu0ARu3sncVyWfSd1eqDTA50e2NgD/wDkyS8Qdo4aQgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 327:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 328:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABGdBTUEAALGPC/xhBQAAA+RJREFUaAXtWktoE1EUPXeSTJuIlip0oVUq9VN1oVKlUKm6EMUPWiuiFkU3flBcuBGXBUHcVRAVEUSwWKHWz8JKd62I4g9xYVG0WrT1B1JU/PSTPO+MJkzyZpLJy9BOJQ+avM89553z7svkdSbAf1bISz9iT2UInz/tBcQOCDGPucel4f8BomcANSFUdJZang2miXU95JkhsbG8BOJXGwQqXc+eCKQniOirqfnNp0SXYsUTQ6JheRBPXt7hzFTxivfzyh9HAJ2s6VcaXWFEsYwzeYRxxYx5gAUzl1BDx3AaTMYhbwzVTd2CaPQyz/YNQb2KWnueZ5z5X4DYVFaB4cH73JwALbCNrr0zeJSLpoy0AqOxWrNJdCobMwbGjGeciY/FNpjvObx4Y4jEDFODEPeUtMRxcR4lkr8gbwwJhE06CgwoaYnj4jxKJF4aykGA11BvMuS1qhz48oZyWLwRgeYzNCLLnMMk/12GHI8+YldZIb4O7efD5lY+b1WAEHFcOAHvFoYQSzOPcUJ/wVqaURQ6Qxd6fqfG2hoStWVlEIM3OXhuKsBH7S6Qvpau9/RYNUmGxObSMAZjjzjIz2biHrqga4uopTdxqpe3ypDYP0bMGKbm4q/euEG7vS+2JUbHRCVZr5whgTljwkdcpEBFvGq8y4aQ5mpmRfqnnnTfIpiTruISIJAbhe38Uf4vvP+z7VCmTnU1h04Cy+oy8auPd14FGg9mjbfbcu5IZi10F6capcivnqGjO4HqtUBQncLR6zBvubvG93r2Rf5i3TBZZE8zugi68T7hQ33Lja4Hx9nzhhyXxicD+Qz5JBGOMtSvubX7gLoDQKjAkVx5wDgptDcBF49lTaFuaAUfyidMzHpC14CV9SNs6PRhYNV2zpDuWqPrQCNDHXz0USjqGeriJyDGn89K/irns4RIcvIZkpbEZx35DPksIZIcmwyRdHtVQvmqI1mvjSHR7Su9mcQQXllDZEOkXbEG+L9OrVaNsqGQ3sh3+HutQb6tGzoNvZYiGaKW11/5ccU6NvXBEufDKr03dJp6LeokQ8YYXet7ilB4Pps6wc2Plng/VD+auvTwAlNniqLE3ZKU/qSmqJ9WjJ/Rh/zgqzxpILVB1IZCbXdqd8b279g55l6TNo6oG5HAYrr0tj9dnCtDBoHYVFqFqGjniYscCN8gQEvpal/Wnz9RN6WUuW8z73QHbv5RlLaSWnszHu9tt5wdqUkmqIb37WNpnOgWdL1axYzBZeIYz1upTebm+YJajRszJpdE4KLD3IIDKEZIiyFS8IXOv/juAuYqRKyfPR6RgUkYimkoQH+mLZZK+gcKlvHeCf6L2gAAAABJRU5ErkJggg=="

/***/ }),

/***/ 329:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABGdBTUEAALGPC/xhBQAABMpJREFUaAXtmnuIFVUYwH+zphWVmYaWu5Vruon2traXUS1SGFhtoRRoZkEURU+CgiIqekAPqfWPCKSHopXVVhZiLlvtP1KmIESPtXSpXVOzVi2pXN3p++bs3DP3MXfvne5cZ8IP5s65Z86c7/ud853vnJk5cFCS3QJOKea5s2YNoW/N5eDOlOM8cMbLeTguNaXcX3YZh37RsVt0bJLzF3KsYOgFnzjLl+8frK6iQK7rOlxbO18Mf0SOcYNVFut1hy4cnuC9nlcdx3HDdIUCuc21owTibVy3KezmA5LvOO0CNttp7fmtkP6CQALTIDArBUZcK4HiOJsEaoZAdeZalwc00DNfJhbGJzBQjbk9lTWovTFj3CyZPePD6Fm9R2z1bA7kZwGZAJCwMRMwNi+p41uDVkAyQF5o1miWNhGbPdsH7M4AefPMgQ7NURpTbfbmSHOzBfImzSg1JuEenfCNBIFkBZBW0dWLkQCQLmfSKtb2AJCszVIr1nYLFNdCsxqNFLDdAlVDcRV0HBKbjuPrYeIZcPSxMHyUUbNb1pO7dsDGDfDL5lhUVxZo3GSYMQ/OnQ4jjytu8O9bYW0brHwdur4pXraMq45f1r16bOgzhl8m9DxWAuQtj8HUptAiRS+sa4dFj8IWeZ6LKM4HWzyW/95DV90Kcx+CocOyTen6Fr5fB90/wJ87zbUjR0DdBJh0Dpw0yZbXhjh9Gix+Gj58xeZHSEUHqhkCdy2AS6+zavv+ERd6A1Ythp4fbX6hVO3JcMVccdEbpTEONQ1ys/RS/RRouQ/6B33aLlSrPCYNSNkud+9CuKTZvx3WfwovPwjbu21eKanRdXDbM3D2Zbb0562w4E77v4SU73I1JZTNL1J/ajbMWy/A43PKh9GatQH0Xq3DF20o1RFBormcht+/9sDhRxi/f1d6K1emnA8XXwMNZ8KI0XJVYk7vr2ZcdUgPfPdV9h3Lnoe+vTBHelnrVh0RJLrLHTNG5hiZX3JD7gSZe+Y9DKddWNycDR3w2pOw+evschr6dwlM77bs/EH++S4XHaiQAg0QdzyXH/H6++XVmqjSIyh7/4aF90PH+8HcSGkfKJrLFVI5uRHuftEavXMHfLQI1nwM2342+WNOhGkz4cr5snoYCcMOg3tazDjKdcFCOkrIixYUClU88SwLs3Y13H4RvPOSCd/7ZGxoSO/eCG/K4Ndr6z8ztdSICadMLVRjpLzK9VDbMtC55Y9eWPos7N8XbtAeecv71E1wwwNwlEy2q5eGly3zSsapy56HylQUd3F/DFXO5cIsHi/zSYtMunpoOmaJH+h6Wcac0GAOTccs8QNt/ckiBNM2t6KpygWFMLN0Bb1dwrbKqiXmHONv/EAarnU+qpLE73JVAvHVWCDvM6CfnbJzwHYL5H3TTBlIxlz9HmskAKQfaNMq1vYAkH5tTqtY24NAK9KKI6vijO0WSPYByBuGrtRBqc1q+4BkgLxNDboPIG0iNgc3ZGRW28rhfYBtrmuTRFMquHTPQmv39OBGjEwPKYB3QTY1SCL5Ec981p8dhFGGLCAPSndoyKaGREMZGN14kfdqKA9oAKpToBoFql3/J0rM1hjdcNFZyK6sMZRb4H+1eSkIl6btZUG7D6aT2AL/AkGkaiFJA68WAAAAAElFTkSuQmCC"

/***/ }),

/***/ 330:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 331:
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

exports.default = {
	props: {
		title: {
			type: String,
			required: true
		},
		isBack: {
			type: Boolean,
			default: false
		}
	}
};

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(87)();
// imports


// module
exports.push([module.i, "\n.nv-title > h1 {\n  border-bottom: 1px solid #e5e4e3;\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n.nv-title > h1 {\n    border: 0;\n}\n.nv-title > h1 {\n    background-repeat: repeat-x;\n    background-position: left bottom;\n    background-image: -webkit-linear-gradient(top, transparent 0%, transparent 50%, #e5e4e3 100%);\n    background-image: linear-gradient(to bottom, transparent 0%, transparent 50%, #e5e4e3 100%);\n    background-size: 100% 1px;\n}\n}\n@media screen and (-webkit-min-device-pixel-ratio: 3) {\n.nv-title > h1 {\n    border: 0;\n}\n.nv-title > h1 {\n    background-repeat: repeat-x;\n    background-position: left bottom;\n    background-image: -webkit-linear-gradient(top, transparent 0%, transparent 66.66%, #e5e4e3 100%);\n    background-image: linear-gradient(to bottom, transparent 0%, transparent 66.66%, #e5e4e3 100%);\n    background-size: 100% 1px;\n}\n}\n.nv-title {\n  height: 0.8rem;\n}\n.nv-title > h1 {\n    z-index: 10;\n    position: fixed;\n    top: 0;\n    left: 50%;\n    width: 7.5rem;\n    margin-left: -3.75rem;\n    height: 0.8rem;\n    line-height: 0.8rem;\n    font-size: 0.36rem;\n    text-align: center;\n    font-weight: normal;\n    color: #030303;\n}\n.nv-title > h1 a {\n      position: absolute;\n      top: 0;\n      left: 0.2rem;\n      width: 0.44rem;\n      height: 100%;\n      background-repeat: no-repeat;\n      background-image: url(" + __webpack_require__(320) + ");\n      background-image: -webkit-image-set(url(" + __webpack_require__(320) + ") 2x, url(" + __webpack_require__(333) + ") 3x);\n      background-size: 0.24rem 0.44rem;\n      background-position: center center;\n}\n", ""]);

// exports


/***/ }),

/***/ 333:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAABCCAYAAAA/rXTfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODc5ODY2REI5MkE2MTFFNkI4NThCM0Y2RDQ5RjBDMzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODc5ODY2REM5MkE2MTFFNkI4NThCM0Y2RDQ5RjBDMzkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMTlFQUZBQTkyQTYxMUU2Qjg1OEIzRjZENDlGMEMzOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Nzk4NjZEQTkyQTYxMUU2Qjg1OEIzRjZENDlGMEMzOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Prv13TYAAAbaSURBVHja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"

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(336)

var Component = __webpack_require__(318)(
  /* script */
  __webpack_require__(331),
  /* template */
  __webpack_require__(335),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "e:\\ihm\\App-Services-RD\\vue-router-demo\\js\\modules\\title.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] title.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44d66eb2", Component.options)
  } else {
    hotAPI.reload("data-v-44d66eb2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "nv-title"
  }, [_c('h1', [(_vm.isBack) ? _c('a', {
    on: {
      "click": function($event) {
        _vm.$router.go(-1)
      }
    }
  }) : _vm._e(), _vm._v(_vm._s(_vm.title))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-44d66eb2", module.exports)
  }
}

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(332);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(319)("00b1fc7e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/.npminstall/css-loader/0.26.2/css-loader/index.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-44d66eb2\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/.npminstall/sass-loader/6.0.2/sass-loader/lib/loader.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/selector.js?type=styles&index=0!./title.vue", function() {
     var newContent = require("!!../../node_modules/.npminstall/css-loader/0.26.2/css-loader/index.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-44d66eb2\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/.npminstall/sass-loader/6.0.2/sass-loader/lib/loader.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/selector.js?type=styles&index=0!./title.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 337:
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

/***/ 338:
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

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(87)();
// imports


// module
exports.push([module.i, "\n.menu-foot {\n  border-top: 1px solid #e5e4e3;\n}\n@media screen and (-webkit-min-device-pixel-ratio: 2) {\n.menu-foot {\n    border: 0;\n}\n.menu-foot {\n    background-repeat: repeat-x;\n    background-position: left top;\n    background-image: -webkit-linear-gradient(bottom, transparent 0%, transparent 50%, #e5e4e3 100%);\n    background-image: linear-gradient(to top, transparent 0%, transparent 50%, #e5e4e3 100%);\n    background-size: 100% 1px;\n}\n}\n@media screen and (-webkit-min-device-pixel-ratio: 3) {\n.menu-foot {\n    border: 0;\n}\n.menu-foot {\n    background-repeat: repeat-x;\n    background-position: left top;\n    background-image: -webkit-linear-gradient(bottom, transparent 0%, transparent 66.66%, #e5e4e3 100%);\n    background-image: linear-gradient(to top, transparent 0%, transparent 66.66%, #e5e4e3 100%);\n    background-size: 100% 1px;\n}\n}\n.menu-foot {\n  z-index: 10;\n  position: fixed;\n  bottom: 0;\n  left: 50%;\n  width: 7.5rem;\n  margin-left: -3.75rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  background: #fff;\n}\n.menu-foot .item {\n    position: relative;\n    display: block;\n    padding-top: 0.6rem;\n    heigth: 0.28rem;\n    line-height: 0.28rem;\n    font-size: 16px;\n    text-align: center;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    color: #807E7D;\n    font-size: 0.22rem;\n    text-align: center;\n}\n.menu-foot .item > i {\n      position: absolute;\n      top: 0.06rem;\n      left: 50%;\n      width: 0.52rem;\n      height: 0.52rem;\n      margin-left: -0.26rem;\n}\n.menu-foot .item.router-link-active {\n      color: #FF4F1A;\n}\n.menu-foot .item:nth-child(1) > i {\n    background-repeat: no-repeat;\n    background-image: url(" + __webpack_require__(330) + ");\n    background-image: -webkit-image-set(url(" + __webpack_require__(330) + ") 2x, url(" + __webpack_require__(349) + ") 3x);\n    background-size: 100% 100%;\n}\n.menu-foot .item:nth-child(1).router-link-active > i {\n    background-repeat: no-repeat;\n    background-image: url(" + __webpack_require__(329) + ");\n    background-image: -webkit-image-set(url(" + __webpack_require__(329) + ") 2x, url(" + __webpack_require__(348) + ") 3x);\n    background-size: 100% 100%;\n}\n.menu-foot .item:nth-child(2) > i {\n    background-repeat: no-repeat;\n    background-image: url(" + __webpack_require__(321) + ");\n    background-image: -webkit-image-set(url(" + __webpack_require__(321) + ") 2x, url(" + __webpack_require__(340) + ") 3x);\n    background-size: 100% 100%;\n}\n.menu-foot .item:nth-child(2).router-link-active > i {\n    background-repeat: no-repeat;\n    background-image: url(" + __webpack_require__(322) + ");\n    background-image: -webkit-image-set(url(" + __webpack_require__(322) + ") 2x, url(" + __webpack_require__(341) + ") 3x);\n    background-size: 100% 100%;\n}\n.menu-foot .item:nth-child(3) > i {\n    background-repeat: no-repeat;\n    background-image: url(" + __webpack_require__(323) + ");\n    background-image: -webkit-image-set(url(" + __webpack_require__(323) + ") 2x, url(" + __webpack_require__(342) + ") 3x);\n    background-size: 100% 100%;\n}\n.menu-foot .item:nth-child(3).router-link-active > i {\n    background-repeat: no-repeat;\n    background-image: url(" + __webpack_require__(324) + ");\n    background-image: -webkit-image-set(url(" + __webpack_require__(324) + ") 2x, url(" + __webpack_require__(343) + ") 3x);\n    background-size: 100% 100%;\n}\n.menu-foot .item:nth-child(3) > i {\n    width: 0.82rem;\n    height: 0.82rem;\n    margin-left: -0.41rem;\n    top: -0.22rem;\n}\n.menu-foot .item:nth-child(4) > i {\n    background-repeat: no-repeat;\n    background-image: url(" + __webpack_require__(327) + ");\n    background-image: -webkit-image-set(url(" + __webpack_require__(327) + ") 2x, url(" + __webpack_require__(346) + ") 3x);\n    background-size: 100% 100%;\n}\n.menu-foot .item:nth-child(4).router-link-active > i {\n    background-repeat: no-repeat;\n    background-image: url(" + __webpack_require__(328) + ");\n    background-image: -webkit-image-set(url(" + __webpack_require__(328) + ") 2x, url(" + __webpack_require__(347) + ") 3x);\n    background-size: 100% 100%;\n}\n.menu-foot .item:nth-child(5) > i {\n    background-repeat: no-repeat;\n    background-image: url(" + __webpack_require__(325) + ");\n    background-image: -webkit-image-set(url(" + __webpack_require__(325) + ") 2x, url(" + __webpack_require__(344) + ") 3x);\n    background-size: 100% 100%;\n}\n.menu-foot .item:nth-child(5).router-link-active > i {\n    background-repeat: no-repeat;\n    background-image: url(" + __webpack_require__(326) + ");\n    background-image: -webkit-image-set(url(" + __webpack_require__(326) + ") 2x, url(" + __webpack_require__(345) + ") 3x);\n    background-size: 100% 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ 340:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 341:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/found-n@3x.png?5a416a0fc486f4b024019e559876fa76";

/***/ }),

/***/ 343:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 344:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 345:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 346:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 347:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 348:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 349:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(352)

var Component = __webpack_require__(318)(
  /* script */
  __webpack_require__(338),
  /* template */
  __webpack_require__(351),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "e:\\ihm\\App-Services-RD\\vue-router-demo\\js\\modules\\menu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7bd8cde0", Component.options)
  } else {
    hotAPI.reload("data-v-7bd8cde0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('footer', {
    staticClass: "menu-foot"
  }, [_c('router-link', {
    staticClass: "item",
    attrs: {
      "to": "/wifi"
    }
  }, [_c('i'), _c('p', [_vm._v("WiFi")])]), _c('router-link', {
    staticClass: "item",
    attrs: {
      "to": "/entertainment"
    }
  }, [_c('i'), _c('p', [_vm._v("娱乐")])]), _c('router-link', {
    staticClass: "item",
    attrs: {
      "to": "/find"
    }
  }, [_c('i'), _c('p', [_vm._v("发现")])]), _c('router-link', {
    staticClass: "item",
    attrs: {
      "to": "/trip"
    }
  }, [_c('i'), _c('p', [_vm._v("行程")])]), _c('router-link', {
    staticClass: "item",
    attrs: {
      "to": "/personal"
    }
  }, [_c('i'), _c('p', [_vm._v("我的")])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7bd8cde0", module.exports)
  }
}

/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(339);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(319)("07f38bb6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/.npminstall/css-loader/0.26.2/css-loader/index.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7bd8cde0\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/.npminstall/sass-loader/6.0.2/sass-loader/lib/loader.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/selector.js?type=styles&index=0!./menu.vue", function() {
     var newContent = require("!!../../node_modules/.npminstall/css-loader/0.26.2/css-loader/index.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-7bd8cde0\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/.npminstall/sass-loader/6.0.2/sass-loader/lib/loader.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/selector.js?type=styles&index=0!./menu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _swiper = __webpack_require__(371);

var _swiper2 = _interopRequireDefault(_swiper);

__webpack_require__(370);

var _title = __webpack_require__(334);

var _title2 = _interopRequireDefault(_title);

var _menu = __webpack_require__(350);

var _menu2 = _interopRequireDefault(_menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//
//
//
//
//
//
//

exports.default = {
	mounted: function mounted() {
		this.$nextTick(function () {
			new _swiper2.default('.find-container', {
				autoplay: 5000,
				pagination: '.swiper-pagination'
			});
		});
	},

	components: {
		nvTitle: _title2.default,
		nvMenu: _menu2.default
	}
};
// Because the configuration of the css-loader ruled out the node_modules directory under the CSS, so need to manually load css-loader

/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(87)();
// imports


// module
exports.push([module.i, "/**\n * Swiper 3.4.1\n * Most modern mobile touch slider and framework with hardware accelerated transitions\n * \n * http://www.idangero.us/swiper/\n * \n * Copyright 2016, Vladimir Kharlampidi\n * The iDangero.us\n * http://www.idangero.us/\n * \n * Licensed under MIT\n * \n * Released on: December 13, 2016\n */\n.swiper-container{margin-left:auto;margin-right:auto;position:relative;overflow:hidden;z-index:1}.swiper-container-no-flexbox .swiper-slide{float:left}.swiper-container-vertical>.swiper-wrapper{-webkit-box-orient:vertical;-moz-box-orient:vertical;-ms-flex-direction:column;-webkit-flex-direction:column;flex-direction:column}.swiper-wrapper{position:relative;width:100%;height:100%;z-index:1;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-transition-property:-webkit-transform;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}.swiper-container-android .swiper-slide,.swiper-wrapper{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-o-transform:translate(0,0);-ms-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.swiper-container-multirow>.swiper-wrapper{-webkit-box-lines:multiple;-moz-box-lines:multiple;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{-webkit-transition-timing-function:ease-out;-moz-transition-timing-function:ease-out;-ms-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out;margin:0 auto}.swiper-slide{-webkit-flex-shrink:0;-ms-flex:0 0 auto;flex-shrink:0;width:100%;height:100%;position:relative}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{-webkit-box-align:start;-ms-flex-align:start;-webkit-align-items:flex-start;align-items:flex-start;-webkit-transition-property:-webkit-transform,height;-moz-transition-property:-moz-transform;-o-transition-property:-o-transform;-ms-transition-property:-ms-transform;transition-property:transform,height}.swiper-container .swiper-notification{position:absolute;left:0;top:0;pointer-events:none;opacity:0;z-index:-1000}.swiper-wp8-horizontal{-ms-touch-action:pan-y;touch-action:pan-y}.swiper-wp8-vertical{-ms-touch-action:pan-x;touch-action:pan-x}.swiper-button-next,.swiper-button-prev{position:absolute;top:50%;width:27px;height:44px;margin-top:-22px;z-index:10;cursor:pointer;-moz-background-size:27px 44px;-webkit-background-size:27px 44px;background-size:27px 44px;background-position:center;background-repeat:no-repeat}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{opacity:.35;cursor:auto;pointer-events:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");left:10px;right:auto}.swiper-button-prev.swiper-button-black,.swiper-container-rtl .swiper-button-next.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-prev.swiper-button-white,.swiper-container-rtl .swiper-button-next.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E\");right:10px;left:auto}.swiper-button-next.swiper-button-black,.swiper-container-rtl .swiper-button-prev.swiper-button-black{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E\")}.swiper-button-next.swiper-button-white,.swiper-container-rtl .swiper-button-prev.swiper-button-white{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E\")}.swiper-pagination{position:absolute;text-align:center;-webkit-transition:.3s;-moz-transition:.3s;-o-transition:.3s;transition:.3s;-webkit-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0);z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullet{width:8px;height:8px;display:inline-block;border-radius:100%;background:#000;opacity:.2}button.swiper-pagination-bullet{border:none;margin:0;padding:0;box-shadow:none;-moz-appearance:none;-ms-appearance:none;-webkit-appearance:none;appearance:none}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-white .swiper-pagination-bullet{background:#fff}.swiper-pagination-bullet-active{opacity:1;background:#007aff}.swiper-pagination-white .swiper-pagination-bullet-active{background:#fff}.swiper-pagination-black .swiper-pagination-bullet-active{background:#000}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;-webkit-transform:translate3d(0,-50%,0);-moz-transform:translate3d(0,-50%,0);-o-transform:translate(0,-50%);-ms-transform:translate3d(0,-50%,0);transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{margin:5px 0;display:block}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 5px}.swiper-pagination-progress{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progress .swiper-pagination-progressbar{background:#007aff;position:absolute;left:0;top:0;width:100%;height:100%;-webkit-transform:scale(0);-ms-transform:scale(0);-o-transform:scale(0);transform:scale(0);-webkit-transform-origin:left top;-moz-transform-origin:left top;-ms-transform-origin:left top;-o-transform-origin:left top;transform-origin:left top}.swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar{-webkit-transform-origin:right top;-moz-transform-origin:right top;-ms-transform-origin:right top;-o-transform-origin:right top;transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progress{width:100%;height:4px;left:0;top:0}.swiper-container-vertical>.swiper-pagination-progress{width:4px;height:100%;left:0;top:0}.swiper-pagination-progress.swiper-pagination-white{background:rgba(255,255,255,.5)}.swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar{background:#fff}.swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar{background:#000}.swiper-container-3d{-webkit-perspective:1200px;-moz-perspective:1200px;-o-perspective:1200px;perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{-webkit-transform-style:preserve-3d;-moz-transform-style:preserve-3d;-ms-transform-style:preserve-3d;transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:-webkit-gradient(linear,left top,right top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(right,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to left,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-right{background-image:-webkit-gradient(linear,right top,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(left,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to right,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-top{background-image:-webkit-gradient(linear,left top,left bottom,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(bottom,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to top,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:-webkit-gradient(linear,left bottom,left top,from(rgba(0,0,0,.5)),to(rgba(0,0,0,0)));background-image:-webkit-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-moz-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:-o-linear-gradient(top,rgba(0,0,0,.5),rgba(0,0,0,0));background-image:linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,0))}.swiper-container-coverflow .swiper-wrapper,.swiper-container-flip .swiper-wrapper{-ms-perspective:1200px}.swiper-container-cube,.swiper-container-flip{overflow:visible}.swiper-container-cube .swiper-slide,.swiper-container-flip .swiper-slide{pointer-events:none;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden;z-index:1}.swiper-container-cube .swiper-slide .swiper-slide,.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active,.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top,.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{z-index:0;-webkit-backface-visibility:hidden;-moz-backface-visibility:hidden;-ms-backface-visibility:hidden;backface-visibility:hidden}.swiper-container-cube .swiper-slide{visibility:hidden;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;width:100%;height:100%}.swiper-container-cube.swiper-container-rtl .swiper-slide{-webkit-transform-origin:100% 0;-moz-transform-origin:100% 0;-ms-transform-origin:100% 0;transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-cube-shadow{position:absolute;left:0;bottom:0;width:100%;height:100%;background:#000;opacity:.6;-webkit-filter:blur(50px);filter:blur(50px);z-index:0}.swiper-container-fade.swiper-container-free-mode .swiper-slide{-webkit-transition-timing-function:ease-out;-moz-transition-timing-function:ease-out;-ms-transition-timing-function:ease-out;-o-transition-timing-function:ease-out;transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;-webkit-transition-property:opacity;-moz-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-zoom-container{width:100%;height:100%;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:center;-moz-box-pack:center;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-moz-box-align:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center;text-align:center}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{max-width:100%;max-height:100%;object-fit:contain}.swiper-scrollbar{border-radius:10px;position:relative;-ms-touch-action:none;background:rgba(0,0,0,.1)}.swiper-container-horizontal>.swiper-scrollbar{position:absolute;left:1%;bottom:3px;z-index:50;height:5px;width:98%}.swiper-container-vertical>.swiper-scrollbar{position:absolute;right:3px;top:1%;z-index:50;width:5px;height:98%}.swiper-scrollbar-drag{height:100%;width:100%;position:relative;background:rgba(0,0,0,.5);border-radius:10px;left:0;top:0}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-lazy-preloader{width:42px;height:42px;position:absolute;left:50%;top:50%;margin-left:-21px;margin-top:-21px;z-index:10;-webkit-transform-origin:50%;-moz-transform-origin:50%;transform-origin:50%;-webkit-animation:swiper-preloader-spin 1s steps(12,end) infinite;-moz-animation:swiper-preloader-spin 1s steps(12,end) infinite;animation:swiper-preloader-spin 1s steps(12,end) infinite}.swiper-lazy-preloader:after{display:block;content:\"\";width:100%;height:100%;background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\");background-position:50%;-webkit-background-size:100%;background-size:100%;background-repeat:no-repeat}.swiper-lazy-preloader-white:after{background-image:url(\"data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E\")}@-webkit-keyframes swiper-preloader-spin{100%{-webkit-transform:rotate(360deg)}}@keyframes swiper-preloader-spin{100%{transform:rotate(360deg)}}", ""]);

// exports


/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(87)();
// imports


// module
exports.push([module.i, "\n.find-container .swiper-slide[data-v-4cabd673] {\n  width: 100%;\n  min-height: 2.8rem;\n}\n.find-container .swiper-slide img[data-v-4cabd673] {\n    display: block;\n    width: 100%;\n}\n.tuijian > h2[data-v-4cabd673] {\n  height: 0.75rem;\n  line-height: 0.75rem;\n  font-size: 0.32rem;\n  font-weight: normal;\n  text-indent: 0.6rem;\n  color: #1a1919;\n  background-repeat: no-repeat;\n  background-image: url(" + __webpack_require__(380) + ");\n  background-size: 0.4rem 0.4rem;\n  background-position: 0.1rem center;\n}\n", ""]);

// exports


/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(362);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(88)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../css-loader/0.26.2/css-loader/index.js!./swiper.min.css", function() {
			var newContent = require("!!../../../../../css-loader/0.26.2/css-loader/index.js!./swiper.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Swiper 3.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: December 13, 2016
 */
(function () {
    'use strict';
    var $;
    /*===========================
    Swiper
    ===========================*/
    var Swiper = function (container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            },
            flip: {
                slideShadows : true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Zoom
            zoom: false,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: true,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: 'container',
            // Hash Navigation
            hashnav: false,
            hashnavWatchState: false,
            // History
            history: false,
            // Commong Nav State
            replaceState: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            // Unique Navigation Elements
            uniqueNavElements: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            normalizeSlideIndex: true,
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // Passive Listeners
            passiveListeners: true,
            // NS
            containerModifierClass: 'swiper-container-', // NEW
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            paginationClickableClass: 'swiper-pagination-clickable', // NEW
            paginationModifierClass: 'swiper-pagination-', // NEW
            lazyLoadingClass: 'swiper-lazy',
            lazyStatusLoadingClass: 'swiper-lazy-loading',
            lazyStatusLoadedClass: 'swiper-lazy-loaded',
            lazyPreloaderClass: 'swiper-lazy-preloader',
            notificationClass: 'swiper-notification',
            preloaderClass: 'preloader',
            zoomContainerClass: 'swiper-zoom-container',
        
            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            */
        
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        
        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            }
            else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
            else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }
        
        // Swiper
        var s = this;
        
        // Params
        s.params = params;
        s.originalParams = originalParams;
        
        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            }
            else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;
        
        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [], point;
            for ( point in s.params.breakpoints ) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
                for ( var param in breakPointsParams ) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
                if(needsReLoop && s.destroyLoop) {
                    s.reLoop(true);
                }
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }
        
        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function () {
                var container = this;
                swipers.push(new Swiper(this, params));
            });
            return swipers;
        }
        
        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        
        s.classNames.push(s.params.containerModifierClass + s.params.direction);
        
        if (s.params.freeMode) {
            s.classNames.push(s.params.containerModifierClass + 'free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push(s.params.containerModifierClass + 'autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Max resistance when touchReleaseOnEdges
        if (s.params.touchReleaseOnEdges) {
            s.params.resistanceRatio = 0;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push(s.params.containerModifierClass + '3d');
            }
            else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push(s.params.containerModifierClass + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
            s.params.setWrapperSize = false;
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            s.params.setWrapperSize = false;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }
        
        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }
        
        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        
        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination);
            }
        
            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
            }
            else {
                s.params.paginationClickable = false;
            }
            s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
        }
        // Next/Prev Buttons
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton);
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton);
                }
            }
        }
        
        // Is Horizontal
        s.isHorizontal = function () {
            return s.params.direction === 'horizontal';
        };
        // s.isH = isH;
        
        // RTL
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push(s.params.containerModifierClass + 'rtl');
        }
        
        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }
        
        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push(s.params.containerModifierClass + 'multirow');
        }
        
        // Check for Android
        if (s.device.android) {
            s.classNames.push(s.params.containerModifierClass + 'android');
        }
        
        // Add classes
        s.container.addClass(s.classNames.join(' '));
        
        // Translate
        s.translate = 0;
        
        // Progress
        s.progress = 0;
        
        // Velocity
        s.velocity = 0;
        
        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
            if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
            if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
            if (s.params.grabCursor) s.unsetGrabCursor();
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
            if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
            if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
            if (s.params.grabCursor) s.setGrabCursor();
        };
        
        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        s.setGrabCursor = function(moving) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
            s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
            s.container[0].style.cursor = moving ? 'grabbing': 'grab';
        };
        s.unsetGrabCursor = function () {
            s.container[0].style.cursor = '';
        };
        if (s.params.grabCursor) {
            s.setGrabCursor();
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        
        s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
            var image;
            function onReady () {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (sizes) {
                        image.sizes = sizes;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
        
            } else {//image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null || !s) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
            }
        };
        
        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            var autoplayDelay = s.params.autoplay;
            var activeSlide = s.slides.eq(s.activeIndex);
            if (activeSlide.attr('data-swiper-autoplay')) {
                autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
            }
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s);
                }
                else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    }
                    else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s);
                        }
                        else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, autoplayDelay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            }
            else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    }
                    else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return (-s.snapGrid[0]);
        };
        s.maxTranslate = function () {
            return (-s.snapGrid[s.snapGrid.length - 1]);
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            var activeSlides = [];
            var newHeight = 0;
            var i;
        
            // Find slides currently in view
            if(s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
                for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
                    var index = s.activeIndex + i;
                    if(index > s.slides.length) break;
                    activeSlides.push(s.slides.eq(index)[0]);
                }
            } else {
                activeSlides.push(s.slides.eq(s.activeIndex)[0]);
            }
        
            // Find new height from heighest slide in view
            for (i = 0; i < activeSlides.length; i++) {
                if (typeof activeSlides[i] !== 'undefined') {
                    var height = activeSlides[i].offsetHeight;
                    newHeight = height > newHeight ? height : newHeight;
                }
            }
        
            // Update Height
            if (newHeight) s.wrapper.css('height', newHeight + 'px');
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            }
            else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            }
            else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return;
            }
        
            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
        
            // Store values
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height;
        };
        
        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
        
            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof s.size === 'undefined') return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }
        
            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
            else s.slides.css({marginRight: '', marginBottom: ''});
        
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                }
                else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }
        
            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide
                            .css({
                                '-webkit-box-ordinal-group': newSlideOrderIndex,
                                '-moz-box-ordinal-group': newSlideOrderIndex,
                                '-ms-flex-order': newSlideOrderIndex,
                                '-webkit-order': newSlideOrderIndex,
                                'order': newSlideOrderIndex
                            });
                    }
                    else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide
                        .css(
                            'margin-' + (s.isHorizontal() ? 'top' : 'left'),
                            (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                        )
                        .attr('data-swiper-column', column)
                        .attr('data-swiper-row', row);
        
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                }
                else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);
        
                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px';
                    }
                    else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
        
        
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                }
                else {
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
        
                s.virtualSize += slideSize + spaceBetween;
        
                prevSlideSize = slideSize;
        
                index ++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;
        
            if (
                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
            }
        
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }
        
            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];
        
            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                    else s.slides.css({marginRight: spaceBetween + 'px'});
                }
                else s.slides.css({marginBottom: spaceBetween + 'px'});
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };
        
        /*=========================
          Dynamic Slides Per View
          ===========================*/
        s.currentSlidesPerView = function () {
            var spv = 1, i, j;
            if (s.params.centeredSlides) {
                var size = s.slides[s.activeIndex].swiperSlideSize;
                var breakLoop;
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slides[i] && !breakLoop) {
                        size += s.slides[i].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
                for (j = s.activeIndex - 1; j >= 0; j--) {
                    if (s.slides[j] && !breakLoop) {
                        size += s.slides[j].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
            }
            else {
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size) {
                        spv++;
                    }
                }
            }
            return spv;
        };
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
        
            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;
        
            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible =
                        (slideBefore >= 0 && slideBefore < s.size) ||
                        (slideAfter > 0 && slideAfter <= s.size) ||
                        (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            }
            else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
        
            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i ++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    }
                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                }
                else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            }
            // for (i = 0; i < s.slidesGrid.length; i++) {
                // if (- translate >= s.slidesGrid[i]) {
                    // newActiveIndex = i;
                // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
        
            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
            s.updateRealIndex();
        };
        s.updateRealIndex = function(){
            s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex, 10);
        };
        
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            if (params.loop) {
                // Duplicate to all looped slides
                if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
            }
            // Next Slide
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                nextSlide = s.slides.eq(0);
                nextSlide.addClass(s.params.slideNextClass);
            }
            // Prev Slide
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                prevSlide = s.slides.eq(-1);
                prevSlide.addClass(s.params.slidePrevClass);
            }
            if (params.loop) {
                // Duplicate to all looped slides
                if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
            }
        
            // Pagination
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                // Current/Total
                var current,
                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (current > total - 1) current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                }
                else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex;
                    }
                    else {
                        current = s.activeIndex || 0;
                    }
                }
                // Types
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function () {
                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                        });
                    }
                    else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total,
                        scaleX = scale,
                        scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1;
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        
            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                    }
                    else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                    }
                    else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                    }
                }
            }
        };
        
        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
                        }
                        else {
                            paginationHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination();
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                    }
                    else {
                        paginationHTML =
                            '<span class="' + s.params.paginationCurrentClass + '"></span>' +
                            ' / ' +
                            '<span class="' + s.params.paginationTotalClass+'"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                    }
                    else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            if (!s) return;
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            function forceSetTranslate() {
                var translate = s.rtl ? -s.translate : s.translate;
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated, newTranslate;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                }
                else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    }
                    else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            }
            else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };
        
        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }
        
            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
        
            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
        
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            }
            else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                }
                else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load();
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
        };
        
        /*=========================
          Events
          ===========================*/
        
        //Define Touch Events
        s.touchEventsDesktop = {start: 'mousedown', move: 'mousemove', end: 'mouseup'};
        if (window.navigator.pointerEnabled) s.touchEventsDesktop = {start: 'pointerdown', move: 'pointermove', end: 'pointerup'};
        else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = {start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp'};
        s.touchEvents = {
            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : s.touchEventsDesktop.start,
            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
        };
        
        
        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }
        
        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
        
            var moveCapture = s.params.nested ? true : false;
        
            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            }
            else {
                if (s.support.touch) {
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
                }
                if ((params.simulateTouch && !s.device.ios && !s.device.android) || (params.simulateTouch && !s.support.touch && s.device.ios)) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);
        
            // Next, Prev, Index
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }
        
            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function () {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };
        
        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };
        
        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                }
                else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;
                    else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }
        
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            }
            else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides,
                    slidesPerView = s.params.slidesPerView === 'auto' ? s.currentSlidesPerView() : s.params.slidesPerView;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = parseInt($(s.clickedSlide).attr('data-swiper-slide-index'), 10);
                    if (s.params.centeredSlides) {
                        if ((slideToIndex < s.loopedSlides - slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + slidesPerView/2)) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                    else {
                        if (slideToIndex > s.slides.length - slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                }
                else {
                    s.slideTo(slideToIndex);
                }
            }
        };
        
        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,
            // Form elements to match
            formElements = 'input, select, textarea, button, video',
            // Last click time
            lastClickTime = Date.now(), clickTimeout,
            //Velocities
            velocities = [],
            allowMomentumBounce;
        
        // Animating Flag
        s.animating = false;
        
        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        
        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }
        
            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        
            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }
        
            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };
        
        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return;
            }
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
                if (!s.isHorizontal()) {
                    // Vertical
                    if (
                        (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
                else {
                    if (
                        (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;
        
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
            if (typeof isScrolling === 'undefined') {
                var touchAngle;
                if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX) {
                    isScrolling = false;
                }
                else {
                    touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
                }
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling)  {
                isTouched = false;
                return;
            }
            if (!startMoving && s.browser.ieTouch) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }
        
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    }
                    else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                    s.setGrabCursor(true);
                }
            }
            isMoved = true;
        
            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
        
            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;
        
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
        
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            }
            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }
        
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }
        
        
            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                }
                else {
                    currentTranslate = startTranslate;
                    return;
                }
            }
        
            if (!s.params.followFinger) return;
        
            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched  && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                s.setGrabCursor(false);
            }
        
            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
        
            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
        
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }
        
            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);
        
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
        
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            }
            else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    }
                    else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }
        
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
        
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
                    s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;
        
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
        
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = - newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.maxTranslate();
                        }
                    }
                    else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.minTranslate();
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
        
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = - newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        }
                        else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }
        
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);
        
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
        
                    } else {
                        s.updateProgress(newPosition);
                    }
        
                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }
        
            // Find current slide
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                }
                else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }
        
            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
        
            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
        
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
            }
            else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
        
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
        
            var translate = - s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                }
                else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);
        
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex ) return false;
            }
        
            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            s.updateRealIndex();
            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
        
            if (speed === 0 || s.browser.lteIE9) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            }
            else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
        
            }
        
            return true;
        };
        
        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    }
                    else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
        
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    }
                    else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.history && s.history) {
                s.history.setHistory(s.params.history, s.activeIndex);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };
        
        s.disableTouchControl = function () {
            s.params.onlyExternal = true;
            return true;
        };
        s.enableTouchControl = function () {
            s.params.onlyExternal = false;
            return true;
        };
        
        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0, y = 0, z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate;
            }
            else {
                y = translate;
            }
        
            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }
        
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }
        
            s.translate = s.isHorizontal() ? x : y;
        
            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            }
            else {
                progress = (translate - s.minTranslate()) / (translatesDiff);
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }
        
            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };
        
        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };
        
        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });
        
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
        
            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }
        
            // Observe container
            initObserver(s.container[0], {childList: false});
        
            // Observe wrapper
            initObserver(s.wrapper[0], {attributes: false});
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
        
            var slides = s.wrapper.children('.' + s.params.slideClass);
        
            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
        
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }
        
            var prependSlides = [], appendSlides = [], i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.reLoop = function (updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false);
            }
        
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            }
            else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            }
            else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
            else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
        
            if (s.params.loop) {
                s.createLoop();
            }
        
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            }
            else {
                s.slideTo(newActiveIndex, 0, false);
            }
        
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };
        

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ?
                                Math.max(1 - Math.abs(slide[0].progress), 0) :
                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide
                            .css({
                                opacity: slideOpacity
                            })
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
        
                    }
        
                },
                setTransition: function (duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            flip: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress,
                            rotateY = rotate,
                            rotateX = 0,
                            tx = -offset,
                            ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        }
                        else if (s.rtl) {
                            rotateY = -rotateY;
                        }
        
                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
        
                        if (s.params.flip.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
        
                        slide
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function () {
                    var wrapperRotate = 0, cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({height: s.width + 'px'});
                        }
                        else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0, ty = 0, tz = 0;
                        if (i % 4 === 0) {
                            tx = - round * 4 * s.size;
                            tz = 0;
                        }
                        else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = - round * 4 * s.size;
                        }
                        else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        }
                        else if ((i - 3) % 4 === 0) {
                            tx = - s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }
        
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
        
                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
        
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                        }
                        else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function () {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
        
                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);
        
                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
        
                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
        
                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function (index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;
        
                var slide = s.slides.eq(index);
                var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');
                if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;
        
                img.each(function () {
                    var _img = $(this);
                    _img.addClass(s.params.lazyStatusLoadingClass);
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset'),
                        sizes = _img.attr('data-sizes');
                    s.loadImage(_img[0], (src || background), srcset, sizes, false, function () {
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background');
                        }
                        else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (sizes) {
                                _img.attr('sizes', sizes);
                                _img.removeAttr('data-sizes');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
        
                        }
        
                        _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);
                        slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            }
                            else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });
        
                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
        
            },
            load: function () {
                var i;
                var slidesPerView = s.params.slidesPerView;
                if (slidesPerView === 'auto') {
                    slidesPerView = 0;
                }
                if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                }
                else {
                    if (slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + slidesPerView ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        // Next Slides
                        for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = minIndex; i < s.activeIndex ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
        
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function () {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function () {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };
        

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function (e) {
                var sb = s.scrollbar;
                var x = 0, y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ?
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
                var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                }
                else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function (e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();
        
                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);
        
                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();
                else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
        
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            draggableEvents: (function () {
                if ((s.params.simulateTouch === false && !s.support.touch)) return s.touchEventsDesktop;
                else return s.touchEvents;
            })(),
            enableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
                $(target).on(sb.draggableEvents.move, sb.dragMove);
                $(target).on(sb.draggableEvents.end, sb.dragEnd);
            },
            disableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(s.draggableEvents.start, sb.dragStart);
                $(target).off(s.draggableEvents.move, sb.dragMove);
                $(target).off(s.draggableEvents.end, sb.dragEnd);
            },
            set: function () {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar);
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
        
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
        
                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                }
                else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }
        
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                }
                else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function () {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
        
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    }
                    else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                }
                else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    }
                    else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                    }
                    else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                }
                else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                    }
                    else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function (duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function (x, y) {
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;
        
                this.interpolate = function (x2) {
                    if (!x2) return 0;
        
                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
        
                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
        
                var binarySearch = (function() {
                    var maxIndex, minIndex, guess;
                    return function(array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1)
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        return maxIndex;
                    };
                })();
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function(c){
                if(!s.controller.spline) s.controller.spline = s.params.loop ?
                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function (translate, byController) {
               var controlled = s.params.control;
               var multiplier, controlledTranslate;
               function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }
        
                    if(!controlledTranslate || s.params.controlBy === 'container'){
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }
        
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
               }
               if (s.isArray(controlled)) {
                   for (var i = 0; i < controlled.length; i++) {
                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                           setControlledTranslate(controlled[i]);
                       }
                   }
               }
               else if (controlled instanceof Swiper && byController !== controlled) {
        
                   setControlledTranslate(controlled);
               }
            },
            setTransition: function (duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function(){
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
        
                        });
                    }
                }
                if (s.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                }
                else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            onHashCange: function (e, a) {
                var newHash = document.location.hash.replace('#', '');
                var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
                if (newHash !== activeSlideHash) {
                    s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + (newHash) + '"]').index());
                }
            },
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
                $(window)[action]('hashchange', s.hashnav.onHashCange);
            },
            setHash: function () {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                if (s.params.replaceState && window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, ('#' + s.slides.eq(s.activeIndex).attr('data-hash') || ''));
                } else {
                    var slide = s.slides.eq(s.activeIndex);
                    var hash = slide.attr('data-hash') || slide.attr('data-history');
                    document.location.hash = hash || '';
                }
            },
            init: function () {
                if (!s.params.hashnav || s.params.history) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (!hash) return;
                var speed = 0;
                for (var i = 0, length = s.slides.length; i < length; i++) {
                    var slide = s.slides.eq(i);
                    var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                    if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                        var index = slide.index();
                        s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                    }
                }
                if (s.params.hashnavWatchState) s.hashnav.attachEvents();
            },
            destroy: function () {
                if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
            }
        };

        /*=========================
          History Api with fallback to Hashnav
          ===========================*/
        s.history = {
            init: function () {
                if (!s.params.history) return;
                if (!window.history || !window.history.pushState) {
                    s.params.history = false;
                    s.params.hashnav = true;
                    return;
                }
                s.history.initialized = true;
                this.paths = this.getPathValues();
                if (!this.paths.key && !this.paths.value) return;
                this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
                if (!s.params.replaceState) {
                    window.addEventListener('popstate', this.setHistoryPopState);
                }
            },
            setHistoryPopState: function() {
                s.history.paths = s.history.getPathValues();
                s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
            },
            getPathValues: function() {
                var pathArray = window.location.pathname.slice(1).split('/');
                var total = pathArray.length;
                var key = pathArray[total - 2];
                var value = pathArray[total - 1];
                return { key: key, value: value };
            },
            setHistory: function (key, index) {
                if (!s.history.initialized || !s.params.history) return;
                var slide = s.slides.eq(index);
                var value = this.slugify(slide.attr('data-history'));
                if (!window.location.pathname.includes(key)) {
                    value = key + '/' + value;
                }
                if (s.params.replaceState) {
                    window.history.replaceState(null, null, value);
                } else {
                    window.history.pushState(null, null, value);
                }
            },
            slugify: function(text) {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '');
            },
            scrollToSlide: function(speed, value, runCallbacks) {
                if (value) {
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHistory = this.slugify(slide.attr('data-history'));
                        if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, runCallbacks);
                        }
                    }
                } else {
                    s.slideTo(0, speed, runCallbacks);
                }
            }
        };

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [
                    [swiperOffset.left, swiperOffset.top],
                    [swiperOffset.left + s.width, swiperOffset.top],
                    [swiperOffset.left, swiperOffset.top + s.height],
                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
                ];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (
                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
                    ) {
                        inView = true;
                    }
        
                }
                if (!inView) return;
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
            }
            else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
        }
        s.disableKeyboardControl = function () {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard);
        };
        

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: (new window.Date()).getTime()
        };
        if (s.params.mousewheelControl) {
            /**
             * The best combination if you prefer spinX + spinY normalization.  It favors
             * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
             * 'wheel' event, making spin speed determination impossible.
             */
            s.mousewheel.event = (navigator.userAgent.indexOf('firefox') > -1) ?
                'DOMMouseScroll' :
                isEventSupported() ?
                    'wheel' : 'mousewheel';
        }
        
        function isEventSupported() {
            var eventName = 'onwheel';
            var isSupported = eventName in document;
        
            if (!isSupported) {
                var element = document.createElement('div');
                element.setAttribute(eventName, 'return;');
                isSupported = typeof element[eventName] === 'function';
            }
        
            if (!isSupported &&
                document.implementation &&
                document.implementation.hasFeature &&
                    // always returns true in newer browsers as per the standard.
                    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
                document.implementation.hasFeature('', '') !== true ) {
                // This is the only way to test support for the `wheel` event in IE9+.
                isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
            }
        
            return isSupported;
        }
        
        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;
        
            var data = normalizeWheel( e );
        
            if (s.params.mousewheelForceToAxis) {
                if (s.isHorizontal()) {
                    if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;
                    else return;
                }
                else {
                    if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;
                    else return;
                }
            }
            else {
                delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? - data.pixelX * rtlFactor : - data.pixelY;
            }
        
            if (delta === 0) return;
        
            if (s.params.mousewheelInvert) delta = -delta;
        
            if (!s.params.freeMode) {
                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating) {
                            s.slideNext();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                    else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating) {
                            s.slidePrev();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
        
            }
            else {
                //Freemode or scrollContainer:
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning,
                    wasEnd = s.isEnd;
        
                if (position >= s.minTranslate()) position = s.minTranslate();
                if (position <= s.maxTranslate()) position = s.maxTranslate();
        
                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();
        
                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses();
                }
        
                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                }
                else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load();
                    }
                }
                // Emit event
                s.emit('onScroll', s, e);
        
                // Stop autoplay
                if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay();
        
                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }
        
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.off(s.mousewheel.event, handleMousewheel);
            return true;
        };
        
        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.on(s.mousewheel.event, handleMousewheel);
            return true;
        };
        
        /**
         * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
         * complicated, thus this doc is long and (hopefully) detailed enough to answer
         * your questions.
         *
         * If you need to react to the mouse wheel in a predictable way, this code is
         * like your bestest friend. * hugs *
         *
         * As of today, there are 4 DOM event types you can listen to:
         *
         *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
         *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
         *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
         *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
         *
         * So what to do?  The is the best:
         *
         *   normalizeWheel.getEventType();
         *
         * In your event callback, use this code to get sane interpretation of the
         * deltas.  This code will return an object with properties:
         *
         *   spinX   -- normalized spin speed (use for zoom) - x plane
         *   spinY   -- " - y plane
         *   pixelX  -- normalized distance (to pixels) - x plane
         *   pixelY  -- " - y plane
         *
         * Wheel values are provided by the browser assuming you are using the wheel to
         * scroll a web page by a number of lines or pixels (or pages).  Values can vary
         * significantly on different platforms and browsers, forgetting that you can
         * scroll at different speeds.  Some devices (like trackpads) emit more events
         * at smaller increments with fine granularity, and some emit massive jumps with
         * linear speed or acceleration.
         *
         * This code does its best to normalize the deltas for you:
         *
         *   - spin is trying to normalize how far the wheel was spun (or trackpad
         *     dragged).  This is super useful for zoom support where you want to
         *     throw away the chunky scroll steps on the PC and make those equal to
         *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
         *     resolve a single slow step on a wheel to 1.
         *
         *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
         *     get the crazy differences between browsers, but at least it'll be in
         *     pixels!
         *
         *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
         *     should translate to positive value zooming IN, negative zooming OUT.
         *     This matches the newer 'wheel' event.
         *
         * Why are there spinX, spinY (or pixels)?
         *
         *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
         *     with a mouse.  It results in side-scrolling in the browser by default.
         *
         *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
         *
         *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
         *     probably is by browsers in conjunction with fancy 3D controllers .. but
         *     you know.
         *
         * Implementation info:
         *
         * Examples of 'wheel' event if you scroll slowly (down) by one step with an
         * average mouse:
         *
         *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
         *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
         *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
         *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
         *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
         *
         * On the trackpad:
         *
         *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
         *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
         *
         * On other/older browsers.. it's more complicated as there can be multiple and
         * also missing delta values.
         *
         * The 'wheel' event is more standard:
         *
         * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
         *
         * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
         * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
         * backward compatibility with older events.  Those other values help us
         * better normalize spin speed.  Example of what the browsers provide:
         *
         *                          | event.wheelDelta | event.detail
         *        ------------------+------------------+--------------
         *          Safari v5/OS X  |       -120       |       0
         *          Safari v5/Win7  |       -120       |       0
         *         Chrome v17/OS X  |       -120       |       0
         *         Chrome v17/Win7  |       -120       |       0
         *                IE9/Win7  |       -120       |   undefined
         *         Firefox v4/OS X  |     undefined    |       1
         *         Firefox v4/Win7  |     undefined    |       3
         *
         */
        function normalizeWheel( /*object*/ event ) /*object*/ {
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;
        
            var sX = 0, sY = 0,       // spinX, spinY
                pX = 0, pY = 0;       // pixelX, pixelY
        
            // Legacy
            if( 'detail' in event ) {
                sY = event.detail;
            }
            if( 'wheelDelta' in event ) {
                sY = -event.wheelDelta / 120;
            }
            if( 'wheelDeltaY' in event ) {
                sY = -event.wheelDeltaY / 120;
            }
            if( 'wheelDeltaX' in event ) {
                sX = -event.wheelDeltaX / 120;
            }
        
            // side scrolling on FF with DOMMouseScroll
            if( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
                sX = sY;
                sY = 0;
            }
        
            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;
        
            if( 'deltaY' in event ) {
                pY = event.deltaY;
            }
            if( 'deltaX' in event ) {
                pX = event.deltaX;
            }
        
            if( (pX || pY) && event.deltaMode ) {
                if( event.deltaMode === 1 ) {          // delta in LINE units
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {                             // delta in PAGE units
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
            }
        
            // Fall-back if spin cannot be determined
            if( pX && !sX ) {
                sX = (pX < 1) ? -1 : 1;
            }
            if( pY && !sY ) {
                sY = (pY < 1) ? -1 : 1;
            }
        
            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;
        
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            }
            else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0';
                }
                else {
                    pY = p;
                    pX = '0';
                }
            }
        
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            }
            else {
                pX = pX * progress * rtlFactor + 'px' ;
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            }
            else {
                pY = pY * progress + 'px' ;
            }
        
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function () {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    setParallaxTransform(this, s.progress);
        
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function (duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };
        

        /*=========================
          Zoom
          ===========================*/
        s.zoom = {
            // "Global" Props
            scale: 1,
            currentScale: 1,
            isScaling: false,
            gesture: {
                slide: undefined,
                slideWidth: undefined,
                slideHeight: undefined,
                image: undefined,
                imageWrap: undefined,
                zoomMax: s.params.zoomMax
            },
            image: {
                isTouched: undefined,
                isMoved: undefined,
                currentX: undefined,
                currentY: undefined,
                minX: undefined,
                minY: undefined,
                maxX: undefined,
                maxY: undefined,
                width: undefined,
                height: undefined,
                startX: undefined,
                startY: undefined,
                touchesStart: {},
                touchesCurrent: {}
            },
            velocity: {
                x: undefined,
                y: undefined,
                prevPositionX: undefined,
                prevPositionY: undefined,
                prevTime: undefined
            },
            // Calc Scale From Multi-touches
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var x1 = e.targetTouches[0].pageX,
                    y1 = e.targetTouches[0].pageY,
                    x2 = e.targetTouches[1].pageX,
                    y2 = e.targetTouches[1].pageY;
                var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                return distance;
            },
            // Events
            onGestureStart: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.slide || !z.gesture.slide.length) {
                    z.gesture.slide = $(this);
                    if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                    z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax ;
                    if (z.gesture.imageWrap.length === 0) {
                        z.gesture.image = undefined;
                        return;
                    }
                }
                z.gesture.image.transition(0);
                z.isScaling = true;
            },
            onGestureChange: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (s.support.gestures) {
                    z.scale = e.scale * z.currentScale;
                }
                else {
                    z.scale = (z.gesture.scaleMove / z.gesture.scaleStart) * z.currentScale;
                }
                if (z.scale > z.gesture.zoomMax) {
                    z.scale = z.gesture.zoomMax - 1 + Math.pow((z.scale - z.gesture.zoomMax + 1), 0.5);
                }
                if (z.scale < s.params.zoomMin) {
                    z.scale =  s.params.zoomMin + 1 - Math.pow((s.params.zoomMin - z.scale + 1), 0.5);
                }
                z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
            },
            onGestureEnd: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
                        return;
                    }
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
                z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                z.currentScale = z.scale;
                z.isScaling = false;
                if (z.scale === 1) z.gesture.slide = undefined;
            },
            onTouchStart: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (z.image.isTouched) return;
                if (s.device.os === 'android') e.preventDefault();
                z.image.isTouched = true;
                z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            },
            onTouchMove: function (e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                s.allowClick = false;
                if (!z.image.isTouched || !z.gesture.slide) return;
        
                if (!z.image.isMoved) {
                    z.image.width = z.gesture.image[0].offsetWidth;
                    z.image.height = z.gesture.image[0].offsetHeight;
                    z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
                    z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
                    z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
                    z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
                    z.gesture.imageWrap.transition(0);
                    if (s.rtl) z.image.startX = -z.image.startX;
                    if (s.rtl) z.image.startY = -z.image.startY;
                }
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
        
                if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;
        
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
        
                z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
                if (!z.image.isMoved && !z.isScaling) {
                    if (s.isHorizontal() &&
                        (Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x) ||
                        (Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                    else if (!s.isHorizontal() &&
                        (Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y) ||
                        (Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();
        
                z.image.isMoved = true;
                z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
                z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;
        
                if (z.image.currentX < z.image.minX) {
                    z.image.currentX =  z.image.minX + 1 - Math.pow((z.image.minX - z.image.currentX + 1), 0.8);
                }
                if (z.image.currentX > z.image.maxX) {
                    z.image.currentX = z.image.maxX - 1 + Math.pow((z.image.currentX - z.image.maxX + 1), 0.8);
                }
        
                if (z.image.currentY < z.image.minY) {
                    z.image.currentY =  z.image.minY + 1 - Math.pow((z.image.minY - z.image.currentY + 1), 0.8);
                }
                if (z.image.currentY > z.image.maxY) {
                    z.image.currentY = z.image.maxY - 1 + Math.pow((z.image.currentY - z.image.maxY + 1), 0.8);
                }
        
                //Velocity
                if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
                if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
                if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
                z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
                z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
                if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
                if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
                z.velocity.prevPositionX = z.image.touchesCurrent.x;
                z.velocity.prevPositionY = z.image.touchesCurrent.y;
                z.velocity.prevTime = Date.now();
        
                z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTouchEnd: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (!z.image.isTouched || !z.image.isMoved) {
                    z.image.isTouched = false;
                    z.image.isMoved = false;
                    return;
                }
                z.image.isTouched = false;
                z.image.isMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = z.velocity.x * momentumDurationX;
                var newPositionX = z.image.currentX + momentumDistanceX;
                var momentumDistanceY = z.velocity.y * momentumDurationY;
                var newPositionY = z.image.currentY + momentumDistanceY;
        
                //Fix duration
                if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
                if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        
                z.image.currentX = newPositionX;
                z.image.currentY = newPositionY;
        
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
                z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
                z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);
        
                z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTransitionEnd: function (s) {
                var z = s.zoom;
                if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
                    z.gesture.image.transform('translate3d(0,0,0) scale(1)');
                    z.gesture.imageWrap.transform('translate3d(0,0,0)');
                    z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
                    z.scale = z.currentScale = 1;
                }
            },
            // Toggle Zoom
            toggleZoom: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.slide) {
                    z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
        
                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;
        
                if (typeof z.image.touchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                }
                else {
                    touchX = z.image.touchesStart.x;
                    touchY = z.image.touchesStart.y;
                }
        
                if (z.scale && z.scale !== 1) {
                    // Zoom Out
                    z.scale = z.currentScale = 1;
                    z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
                    z.gesture.slide = undefined;
                }
                else {
                    // Zoom In
                    z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (e) {
                        slideWidth = z.gesture.slide[0].offsetWidth;
                        slideHeight = z.gesture.slide[0].offsetHeight;
                        offsetX = z.gesture.slide.offset().left;
                        offsetY = z.gesture.slide.offset().top;
                        diffX = offsetX + slideWidth/2 - touchX;
                        diffY = offsetY + slideHeight/2 - touchY;
        
                        imageWidth = z.gesture.image[0].offsetWidth;
                        imageHeight = z.gesture.image[0].offsetHeight;
                        scaledWidth = imageWidth * z.scale;
                        scaledHeight = imageHeight * z.scale;
        
                        translateMinX = Math.min((slideWidth / 2 - scaledWidth / 2), 0);
                        translateMinY = Math.min((slideHeight / 2 - scaledHeight / 2), 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;
        
                        translateX = diffX * z.scale;
                        translateY = diffY * z.scale;
        
                        if (translateX < translateMinX) {
                            translateX =  translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }
        
                        if (translateY < translateMinY) {
                            translateY =  translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    }
                    else {
                        translateX = 0;
                        translateY = 0;
                    }
                    z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                }
            },
            // Attach/Detach Events
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
        
                if (s.params.zoom) {
                    var target = s.slides;
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    // Scale image
                    if (s.support.gestures) {
                        s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
                        s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
                        s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
                    }
                    else if (s.touchEvents.start === 'touchstart') {
                        s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
                        s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
                        s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
                    }
        
                    // Move image
                    s[action]('touchStart', s.zoom.onTouchStart);
                    s.slides.each(function (index, slide){
                        if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
                            $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
                        }
                    });
                    s[action]('touchEnd', s.zoom.onTouchEnd);
        
                    // Scale Out
                    s[action]('transitionEnd', s.zoom.onTransitionEnd);
                    if (s.params.zoomToggle) {
                        s.on('doubleTap', s.zoom.toggleZoom);
                    }
                }
            },
            init: function () {
                s.zoom.attachEvents();
            },
            destroy: function () {
                s.zoom.attachEvents(true);
            }
        };

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName (eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                }
                else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {
        
        };
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function () {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };

        // Accessibility tools
        s.a11y = {
            makeFocusable: function ($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function ($el, role) {
                $el.attr('role', role);
                return $el;
            },
        
            addLabel: function ($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },
        
            disable: function ($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },
        
            enable: function ($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },
        
            onEnterKey: function (event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                }
                else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },
        
            liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
        
            notify: function (message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function () {
                // Setup accessibility
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                }
        
                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function () {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function () {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };
        

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            }
            else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.zoom && s.zoom) {
                s.zoom.init();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
            if (s.params.hashnavReplaceState) {
                s.params.replaceState = s.params.hashnavReplaceState;
            }
            if (s.params.history) {
                if (s.history) s.history.init();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };
        
        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
        
            // Wrapper
            s.wrapper.removeAttr('style');
        
            // Slides
            if (s.slides && s.slides.length) {
                s.slides
                    .removeClass([
                      s.params.slideVisibleClass,
                      s.params.slideActiveClass,
                      s.params.slideNextClass,
                      s.params.slidePrevClass
                    ].join(' '))
                    .removeAttr('style')
                    .removeAttr('data-swiper-column')
                    .removeAttr('data-swiper-row');
            }
        
            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }
        
            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
        
            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };
        
        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();
        
            // Destroy zoom
            if (s.params.zoom && s.zoom) {
                s.zoom.destroy();
            }
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Delete history popstate
            if (s.params.history && !s.params.replaceState) {
                window.removeEventListener('popstate', s.history.setHistoryPopState);
            }
            if (s.params.hashnav && s.hashnav)  {
                s.hashnav.destroy();
            }
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };
        
        s.init();
        

    
        // Return swiper instance
        return s;
    };
    

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: (function () {
            var ua = window.navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function (arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
            lteIE9: (function() {
                // create temporary DIV
                var div = document.createElement('div');
                // add content to tmp DIV which is wrapped into the IE HTML conditional statement
                div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
                // return true / false value based on what will browser render
                return div.getElementsByTagName('i').length === 1;
            })()
        },
        /*==================================================
        Devices
        ====================================================*/
        device: (function () {
            var ua = window.navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        })(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })(),
    
            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                var div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
    
            flexbox: (function () {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            })(),
    
            observer: (function () {
                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
            })(),
    
            passiveListener: (function () {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener('testPassiveListener', null, opts);
                } catch (e) {}
                return supportsPassive;
            })(),
    
            gestures: (function () {
                return 'ongesturestart' in window;
            })()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;
                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
                        else return undefined;
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
    
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
                    }
                    catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
    
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                    return this;
                }
            },
            is: function (selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
    
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
    
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    }
                    else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
    
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
    
        return $;
    })();
    

    /*===========================
     Get Dom libraries
     ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
    	if (window[swiperDomPlugins[i]]) {
    		addLibraryPlugin(window[swiperDomPlugins[i]]);
    	}
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
    	domLib = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
    	domLib = Dom7;
    }

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }
    
    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
        if (!('outerWidth' in domLib.fn)) {
            domLib.fn.outerWidth = function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            };
        }
    }

    window.Swiper = Swiper;
})();
/*===========================
Swiper AMD Export
===========================*/
if (true)
{
    module.exports = window.Swiper;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Swiper;
    });
}
//# sourceMappingURL=maps/swiper.js.map


/***/ }),

/***/ 380:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAAv9JREFUWAntVz1MU1EYPd8tpTg7GAeHElra2NGIoE2cnFxcNHHWxRUSUYiKEYKKI5PGXScHFzeTKopxxBRaEgYnBxPjRt/P9bt9CO3LvX33toWEpDd5ffd+P+c7Pe+9+wMM2kCBgQIdFaCOXgen/FrMwfM/NFNSw1do6se2Q7oxVBg9rg7PWwRktnkFu0uu6ab4vigov+SKCOQGJKI/TAiRohJN1qumwrb2/igYYH6fnKqsiAaYsyXRKa5nBaN3z1NKpWKFAqTTRbpQrcfsTsPeFfT9+xpyikQKkc+JUDy4JwXl+ngWjbDGz3QoDhyNycewyNPE1o7en2ztTcFGcM9MThVn4o1wNpmGOcJZQSkvD2H9Vxa+d5VhV9o+Dl0d9UUDMxhKv8fEqR2ij74uzGQzEpTfSmew2xiHCPOQlGMAvku+U7azaqZSys6PHHIHROrDqYFkHaGoITO8Rec3fuoytQTlp7GXrMwtXcKh2Qiv6NL27Ti+6R28GQ88grG2pp6gFM+PgFB7CcKzdkM00j5i5ZKV3BP+7ctqoCvcbqNFKtfn223RSK8g+6IEsaBL6qtN4JGJnKpjVPA/Cfk5N4dQspqH0ATN08U674LMLZGgSpWVsbt8WzbDdOWZpfL206RMK4IKRFby00C4kgRo5xczVK69sIm1JqjAeH58w/PjdRtgYwzhLc93N4z+mMP4kcTioqEUXS/6+3iOGG4EKSzsF+q244jhRhA42y2vljwnDGuCcm3yBBcZbSnUbXd0D8sq35og6E8xcWtlU1KdVxSWZbMn6AelREwij7dSXmKcDdYeiD1BSPO7Q/SX16SHgDjZvFRf2YytA1Ysx3CWiEWpIaHEjzjWaJdnx1WkU0s0sfm7xflYrhdW0WgeqO6wfaTFF2G1GcwDBwVxugUmgKDXyGRyvFxNx8g1w5RN+ZAZyTdjwSflg9aKdWDV9KxXErlWvIbQW+Dt/3c+US5TeZNPc/ZNVgp55jjL2/xzEOkHNFV9Z589iBwoMFDg+CrwD5k9x/8Q8tlBAAAAAElFTkSuQmCC"

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('article', [_c('nv-title', {
    attrs: {
      "title": "往返"
    }
  }), _vm._m(0), _vm._m(1), _c('nv-menu')], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "swiper-container find-container"
  }, [_c('div', {
    staticClass: "swiper-wrapper"
  }, [_c('div', {
    staticClass: "swiper-slide"
  }, [_c('a', {
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('img', {
    attrs: {
      "src": "http://res.iwangfan.com//o2o/images/2017/3/9/1489030596558.jpg"
    }
  })])]), _c('div', {
    staticClass: "swiper-slide"
  }, [_c('a', {
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('img', {
    attrs: {
      "src": "http://res.iwangfan.com//o2o/images/2017/3/2/1488440868126.jpg"
    }
  })])]), _c('div', {
    staticClass: "swiper-slide"
  }, [_c('a', {
    attrs: {
      "href": "javascript:;"
    }
  }, [_c('img', {
    attrs: {
      "src": "http://res.iwangfan.com//o2o/images/2017/3/2/1488440660699.jpg"
    }
  })])])]), _c('div', {
    staticClass: "swiper-pagination"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "tuijian"
  }, [_c('h2', [_vm._v("往返推荐")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4cabd673", module.exports)
  }
}

/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(366);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(319)("e7e42a8c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/.npminstall/css-loader/0.26.2/css-loader/index.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-4cabd673\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/.npminstall/sass-loader/6.0.2/sass-loader/lib/loader.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/selector.js?type=styles&index=0!./find.vue", function() {
     var newContent = require("!!../../node_modules/.npminstall/css-loader/0.26.2/css-loader/index.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/style-rewriter.js?{\"id\":\"data-v-4cabd673\",\"scoped\":true,\"hasInlineConfig\":true}!../../node_modules/.npminstall/sass-loader/6.0.2/sass-loader/lib/loader.js!../../node_modules/.npminstall/vue-loader/11.1.4/vue-loader/lib/selector.js?type=styles&index=0!./find.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

});