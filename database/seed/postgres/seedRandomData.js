const { Client } = require('pg');
const usersData = require('../reviewUsernameData.js');
const reviewHeadingData = require('../reviewHeadingData.js');
const reviewTextData = require('../reviewTextData.js');

const client = new Client({
    user: 'admin',
    password: 'password',
    database: 'reviews_service'
});

client.connect()
.then(() => {
    console.log('Connected to the database!');
})
.catch((err) => {
    console.error('Error connecting to the database: ', err.stack);
});

const seed = async () => {
    let max = 15000000;
    let min = 10000000;
    let products = Math.floor(Math.random() * min);
    let reviews = Math.floor(Math.random() * (max-products) + products);

    while (products + reviews < min) {
         products = Math.floor(Math.random() * min);
         reviews = Math.floor(Math.random() * (max-products) + products);
    }
  
    await client.query('DELETE FROM review_summaries WHERE summary_id >= 0');
    await client.query('DELETE FROM reviews WHERE review_id >= 0');
    await client.query('BEGIN');
    await client.query('PREPARE initialize_summaries (int, int) AS INSERT INTO review_summaries VALUES ($1, $2)')

    for (let i = 0; i < products; i++) {
        await client.query(`EXECUTE initialize_summaries(${i}, ${i})`);
        process.stdout.write(`loading: ${i} / ${products + reviews}\r`);
    }
    
    process.stdout.clearLine();
    console.log('Summaries initialized!');
    await(client.query('PREPARE insert_review (int, int, char(30), char(30), char(30), int) AS INSERT INTO reviews VALUES($1, $2, $3, $4, $5, $6)'));
    
    for (let i = 0; i < reviews; i++) {
        let productId = Math.floor(Math.random() * products);
        let userId = Math.floor(Math.random() * usersData.length);
        let reviewRating = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
        
        await client.query(`EXECUTE insert_review(${i}, ${productId}, '${usersData[userId]}', '${reviewHeadingData[Math.floor(Math.random() * reviewHeadingData.length)]}', '${reviewTextData[Math.floor(Math.random() * reviewTextData.length)]}', ${reviewRating})`);
        process.stdout.write(`loading: ${products + i} / ${products + reviews}\r`);
    }

    process.stdout.clearLine();
    await client.query('END');
    console.log('reviews table seeded!');
    console.log(`${products + reviews} records loaded to the database!`);
    process.exit(0);
}

seed();