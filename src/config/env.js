require('dotenv').config();

for(const key of ['DATABASE_URL', 'FLEET_KEY']){
    if(!process.env[key]) throw new Error('Missing environment variable: ${key}');
}

module.exports = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL,
    fleetKey: process.env.FLEET_KEY,
}