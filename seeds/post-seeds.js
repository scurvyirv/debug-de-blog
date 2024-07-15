const { Post } = require('../models');

const postData = [
  {
    title: 'FIRST title',
    content: 'this is the first post',
    user_id: 1
  },
  {
    title: 'SECOND POST HEY',
    content: 'ugh second post',
    user_id: 1
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;