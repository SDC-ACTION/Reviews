const { Client } = require('pg');
const pgp = require('pg-promise');


const client = new Client({
    user: 'admin',
    password: 'password',
    database: 'postgres'
});


client.connect()
.then(() => {
    console.log('What\'s popping world??');
})
.catch((err) => {
    console.error('oof', err.stack);
});

