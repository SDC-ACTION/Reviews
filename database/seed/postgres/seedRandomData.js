const { Client } = require('pg');
const usersData = require('../reviewUsernameData.js');
const reviewHeadingData = require('../reviewHeadingData.js');
const reviewTextData = require('../reviewTextData.js');

const client = new Client({
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
    let products = 100;
    let reviewId = 0;
  
    await client.query('DELETE FROM review_summaries WHERE summary_id >= 0');
    await client.query('DELETE FROM reviews WHERE review_id >= 0');
    await client.query('BEGIN');
    await client.query('PREPARE insert_summary (int, int, int, int, int, int, int, int) AS INSERT INTO review_summaries VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING product_id, rating_1, rating_2, rating_3, rating_4, rating_5');
    await client.query('PREPARE insert_review (int, int, char(30), char(30), char(30), int) AS INSERT INTO reviews VALUES($1, $2, $3, $4, $5, $6)');
    
    for (let i = 0; i < products; i++) {
        let maxRatingQuantity = Math.floor(Math.random() * (6-1) + 1);
        let rating1 = 0, rating2 = 0, rating3 = 0, rating4 = 0, rating5 = 0;
        let ratingQuantity;

        while (rating1 + rating2 + rating3 + rating4 + rating5 < maxRatingQuantity) {
            let rating = Math.floor(Math.random() * 5);
            if(rating == 1) {
                rating1 += 1;
            } else if(rating == 2) {
                rating2 += 1;
            } else if(rating == 3) {
                rating3 += 1;
            } else if(rating == 4) {
                rating4 += 1;
            } else {
                rating5 += 1;
            }
        }

        ratingQuantity = rating1+rating2+rating3+rating4+rating5;
        await client.query(`EXECUTE insert_summary(${i}, ${i}, ${rating1}, ${rating2}, ${rating3}, ${rating4}, ${rating5}, ${ratingQuantity})`)
        .then( async (data) => {
            process.stdout.write(`Loading: ${i+reviewId}\r`);
            for (let j = 0; j < ratingQuantity; j++) {
                let userIndex = Math.floor(Math.random() * usersData.length);
                let headingIndex = Math.floor(Math.random() * reviewTextData.length);
                let textIndex = Math.floor(Math.random() * reviewTextData.length);

                if(rating1 > 0) {
                    await client.query(`EXECUTE insert_review(${reviewId}, ${data.rows[0].product_id}, '${usersData[userIndex]}', '${reviewHeadingData[headingIndex]}', '${reviewTextData[textIndex]}', ${1})`)
                    reviewId++;
                    rating1--;
                } else if(rating2 > 0) {
                    await client.query(`EXECUTE insert_review(${reviewId}, ${data.rows[0].product_id}, '${usersData[userIndex]}', '${reviewHeadingData[headingIndex]}', '${reviewTextData[textIndex]}', ${2})`)
                    reviewId++;
                    rating2--;
                } else if(rating3 > 0) {
                    await client.query(`EXECUTE insert_review(${reviewId}, ${data.rows[0].product_id}, '${usersData[userIndex]}', '${reviewHeadingData[headingIndex]}', '${reviewTextData[textIndex]}', ${3})`)
                    reviewId++;
                    rating3--;
                } else if(rating4 > 0) {
                    await client.query(`EXECUTE insert_review(${reviewId}, ${data.rows[0].product_id}, '${usersData[userIndex]}', '${reviewHeadingData[headingIndex]}', '${reviewTextData[textIndex]}', ${4})`)
                    reviewId++;
                    rating4--;
                } else {
                    await client.query(`EXECUTE insert_review(${reviewId}, ${data.rows[0].product_id}, '${usersData[userIndex]}', '${reviewHeadingData[headingIndex]}', '${reviewTextData[textIndex]}', ${5})`)
                    reviewId++;
                    rating5--;
                }
                process.stdout.write(`Loading: ${i + reviewId}\r`);
            }
        })
        .catch((err) => {
            console.log('Error seeding database: ', err);
            process.exit(0);
        });
    }

    await client.query('END');
    console.log(`${products+reviewId} total records added!`);
    console.log('------------------');
    console.log(`${reviewId} reviews`);
    console.log(`${products} summaries`);
    process.exit(0);
}

seed();