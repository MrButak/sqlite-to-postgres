const Database = require('better-sqlite3');
const { Client, Pool } = require('pg');

async function main() {

    // sqlite connection
    let db = new Database('citylist.db');
    let statement = db.prepare('SELECT * FROM cities');
    let cities = statement.all();
    
    // postgres connection
    const connectionString = "postgres://username:password@localhost:5432/databasename";
    const client = new Client({
        connectionString,
    });
    client.connect()
    
    for(let i = 0; i < cities.length; i++) {

        let text = 'INSERT INTO cities(cityid, name, state, country, lon, lat) VALUES($1, $2, $3, $4, $5, $6)';
        let values = [cities[i].cityid, cities[i].name, cities[i].state, cities[i].country, cities[i].lon, cities[i].lat];
        const res = await client.query(text, values);
        console.log(i)
    };

    db.close();
    client.end();
    console.log("finished")
};

exports.main = main