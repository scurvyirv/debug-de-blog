const { Comment } = require('../models');

const commentData = [
  {
    comment_text: 'this is the first comment',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'this is the second comment',
    user_id: 1,
    post_id: 1
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;