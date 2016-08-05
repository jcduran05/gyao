'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Show = require('./models/show');
var UserShow = require('./models/user_show');
var Episode = require('./models/episode');
var EpisodeUrl = require('./models/episode_url');

Show.belongsToMany(User, { through: UserShow });
User.belongsToMany(Show, { through: UserShow });

Show.hasMany(Episode);
Episode.hasMany(EpisodeUrl);
