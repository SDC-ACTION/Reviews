const { Client } = require('pg');

const client = new Client({
    database: 'reviews',
    host: '18.144.15.249',
    user: 'postgres',
    password: ''
});

client.connect()
.then(() => {
    console.log('Connected to ProgreSQL database!');
})
.catch((err) => {
    console.error('Error connecting to database: ', err.stack);
});

module.exports = client;