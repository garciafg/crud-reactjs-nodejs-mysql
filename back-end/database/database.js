const Sequelize = require('sequelize');
const connection = new Sequelize('db_blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timezone: '+05:30',
    
});


module.exports = connection;