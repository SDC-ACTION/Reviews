const { Client } = require('pg');
const pgp = require('pg-promise');


const client = new Client({
    user: 'admin',
    password: 'password',
    database: 'reviews_service'
});


client.connect()
.then(() => {
    console.log('Connected to ProgreSQL database!');
})
.catch((err) => {
    console.error('Error connecting to database: ', err.stack);
});

 