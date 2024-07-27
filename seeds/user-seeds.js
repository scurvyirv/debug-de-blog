const { User } = require('../models');

//accesses environmental variables
require('dotenv').config()

const userData = [
    {
        username: process.env.USER_USERNAME,
        password: process.env.USER_PASSWORD,
        email: process.env.USER_EMAIL
    }
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUsers;
