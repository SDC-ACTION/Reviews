const { Client } = require('pg');
const pgp = require('pg-promise');
const users = require('../reviewUsernameData.js');
const reviewHeading = require('../reviewHeadingData.js');
const reviewText = require('../reviewTextData.js');
const reviewHeadingData = require('../reviewHeadingData.js');
const reviewTextData = require('../reviewTextData.js');

const client = new Client({
    user: 'admin',
    password: 'password',
    database: 'reviews_service'
});


client.connect()
.then(() => {
    console.log('What\'s popping world??');
})
.catch((err) => {
    console.error('oof', err.stack);
});

const products = 40;
const reviews = 1;

const seed = async () => {
    await client.query('DELETE FROM users WHERE user_id >= 0');
    await client.query('DELETE FROM products WHERE product_id >= 0');
    await client.query('DELETE FROM reviews WHERE review_id >= 0');

    let userData = [];
    let productData = [];
    for (let i = 0; i < users.length; i++) {
        userData.push(client.query(`INSERT INTO users VALUES(${i}, '${users[i]}');`));
    }

    await Promise.all(userData)
    .then(() => {
        console.log('Successfully seeded users table!');
    })
    .catch((err) => {
        console.error('Error seeding users table: ',err);
        process.exit(0);
    });

    for (let i = 0; i < products; i++) {
        productData.push(client.query(`INSERT INTO products VALUES(${i})`));
    }

    await Promise.all(productData)
    .then(() => {
        console.log('Successfully seeded products table!');
    })
    .catch((err) => {
        console.error('Error seeding products table:', err);
        process.exit(0);
    });


    for (let i = 0; i < reviews; i++) {
        //create function that generates random int for product & user id's
        client.query(`INSERT INTO reviews VALUES(${i}, (SELECT product_id FROM products WHERE product_id = 10), (SELECT username FROM users WHERE user_id = 10), 'this is a heading', 'this is a review', ${5})`)
        .then(() => {
            console.log('Seeded a review!');
            process.exit(0);
        })
        .catch((err) => {
            console.error('Error seeding the review: ', err);
            process.exit(0);
        });
    }

    // await Promise.all(productData)
    // .then(() => {
    //     console.log('Successfully seeded reviews table!');
    //     process.exit(0);
    // })
    // .catch((err) => {
    //     console.error('Error seeding reviews table:', err);
    // });

}

seed();




 