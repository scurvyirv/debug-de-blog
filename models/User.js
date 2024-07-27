//import parts from sequelize library
const { Model, DataTypes } = require('sequelize');

//import bcrypt to protect sensitive user data
const bcrypt = require('bcrypt');

//import database connection from connection.js
const sequelize = require('../config/connection');

//initialize User model by extending table from Sequelize's Model class
class User extends Model {
  // Method to check password (NEEDS TO BE FIXED BECAUSE MISMATCH)
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 14],
        isAlphanumeric: true,
      },
    },
  },
  {
    hooks: {
        //creates an object with hashed password after newUserData is created
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      //hashes password provided in updatedUserData and then saves it to database
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'users',
  }
);

module.exports = User;