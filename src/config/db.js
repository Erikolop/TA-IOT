const {Pool} = require('pg');
const {databaseUrl} = require('./env');

module.exports = new Pool({ connectionString: databaseUrl});