// import classNames from 'classnames/bind'
// import defaultStyles from './style/index.scss'

if (!window._) {
    window._ = require('lodash')
    window._.mixin(require('lodash-inflection'))
}

if (!window.moment) window.moment = require('moment')
if (!window.async) window.async = require('async')
if (!window.Promise) window.Promise = require("bluebird")

// if (!window.style) window.style = classNames.bind(defaultStyles)

if (!window.React) window.React = require('react')
if (!window.ReactDOM) window.ReactDOM = require('react-dom')

// import Application from './app'
if (!window.Application) window.Application = require('./app').default
if (!window.appl) window.appl = new Application()
