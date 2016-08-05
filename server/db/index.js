'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Show = require('./models/show');
var UserShow = require('./models/user_show');
var Episodes = require('./models/episode');

Show.belongsToMany(User, { through: UserShow });
User.belongsToMany(Show, { through: UserShow });

Show.hasMany(Episodes);
