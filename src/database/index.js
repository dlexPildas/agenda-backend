const Sequelize = require("sequelize");
const { Pool } = require("pg");

const databaseConfig = require("../config/database");

const User = require("../app/models/User");
const Schedule = require("../app/models/Schedule");
const Event = require("../app/models/Event");

const models = [User, Schedule, Event];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
