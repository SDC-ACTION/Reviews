const client = require('../../postgres/index.js');
const usersData = require('../reviewUsernameData.js');
const reviewHeadingData = require('../reviewHeadingData.js');
const reviewTextData = require('../reviewTextData.js');

const rng = (min, max) => Math.floor(Math.random() * (max - min) + min);

const seed = async () => {
    let products = 10000000;
    let reviews = 12000000;

    await client.query('DELETE FROM reviews WHERE review_id >= 0');
    await client.query('BEGIN');
    await client.query('PREPARE insert_review (int, int, varchar(20), varchar(20), varchar(2000), int, VARCHAR(30)) AS INSERT INTO reviews VALUES($1, $2, $3, $4, $5, $6, $7)');

    for (let i = 0; i < reviews; i++) {
        let product = rng(0, products);
        let userIndex = rng(0, usersData.length);
        let headingIndex = rng(0, reviewHeadingData.length);
        let textIndex = rng(0, reviewTextData.length);
        let rating = rng(1, 5);
        const randMonth = rng(1, 13);
        const randDay = rng(1, 29);
        const randHr = rng(1, 25);
        const randMin = rng(1, 61);
        const randSec = rng(1, 61);
        const date = new Date(2021, randMonth, randDay, randHr, randMin, randSec).toISOString();

        await client.query(`EXECUTE insert_review(${i}, ${product}, '${usersData[userIndex]}', '${reviewHeadingData[headingIndex]}', '${reviewTextData[textIndex]}', ${rating}, '${date}')`);
        process.stdout.write(`Loading: ${i}\r`);
    }

    await client.query('END');
    console.log(`${reviews} reviews added!`);
    process.exit(0);
}

seed();