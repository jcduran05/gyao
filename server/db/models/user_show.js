'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');
var Show = require('./show');

module.exports = db.define('user_show', {}, {
    instanceMethods: {},
    classMethods: {}
}, {
  }
);
