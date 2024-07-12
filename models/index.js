// models/index.js handles associations of different models

//import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//User can have multiple posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//Posts belong to one specific User
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

//User can have multiple comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

//Comments belong to one specific User
Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

//Posts can have multiple comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

//Comments belong to one specific Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };