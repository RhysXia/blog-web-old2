require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Ryths Blog',
    titleTemplate: '%s | ryths.cn',
    htmlAttrs: {
      xmlns: 'http://www.w3.org/1999/xhtml',
      lang: 'zh-CN'
    },
    meta: [{ charset: 'utf-8' }, { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: 'author', content: 'Ryths,postmaster@ryths.cn' }, { name: 'keywords', content: 'blog,Ryths,IT,JAVA,Vue,前端,后端,研究生' }, { name: 'description', content: '个人技术博客，分享知识，寻找志同道合的朋友' }, { name: 'copyright', content: 'Ryths Xia' }],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      href: 'https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css'
    }],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/scss/public.scss'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#4dce9b', failedColor: '#F56C6C' },
  offline: true,
  plugins: ['~/plugins/http', '~/plugins/components', '~/plugins/filters', '~/plugins/token', { src: '~/plugins/offline', ssr: false }],
  build: {
    vendor: ['~/plugins/http', '~/plugins/token', '~/plugins/components', '~/plugins/filters', '~/plugins/offline', '~/utils/markdown'],
    extractCSS: true,
    babel: {},
    extend: function extend(webpackConfig, _ref) {
      var isDev = _ref.isDev,
          isClient = _ref.isClient,
          isServer = _ref.isServer;
    }
  },
  router: {
    // scrollBehavior (to, from, savedPosition) {
    //   return {x: 0, y: 0}
    // },
    middleware: ['change-col-page']
  }
};

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* eslint-disable indent */



var app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 3000;

// Import and Set Nuxt.js options
var config = __webpack_require__(0);
config.dev = !(app.env === 'production');

// Instantiate nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

// Build in development
if (config.dev) {
  var builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
  builder.build().catch(function (e) {
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });
}

app.use(function (ctx) {
  ctx.status = 200; // koa defaults to 404 when it sees that status is unset
  ctx.req.cookies = ctx.cookies;
  return new Promise(function (resolve, reject) {
    ctx.res.on('close', resolve);
    ctx.res.on('finish', resolve);
    nuxt.render(ctx.req, ctx.res, function (promise) {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject);
    });
  });
});

app.listen(port, host);
console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }
/******/ ]);
//# sourceMappingURL=main.map