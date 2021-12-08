const Sequelize = require("sequelize");

const db = {};

const dbinfo = new Sequelize("db_api", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});

dbinfo
    .authenticate()
    .then(() => {
        console.log("connected on DB");
    })
    .catch((err) => {
        console.log("Sorry : ", err);
    });

db.user = require("../models/User")(dbinfo, Sequelize);

db.dbinfo = dbinfo;
db.Sequelize = Sequelize;

// dbinfo.sync({ force: true });

module.exports = db;