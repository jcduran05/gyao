'use strict';
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('episode', {
    name: {
        type: Sequelize.STRING
    },
    // url: {
    //     type: Sequelize.ARRAY(Sequelize.TEXT)
    // },
    date: {
        type: Sequelize.DATE
    },
}, {
    instanceMethods: {},
    classMethods: {}
});
