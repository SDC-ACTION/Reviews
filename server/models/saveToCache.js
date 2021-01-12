const memcached = require('./index.js');

const saveToCache = (req, res, next) => {
    let oldWrite = res.write,
    oldEnd = res.end;

    let chunks = [];

    res.write = function (chunk) {
        chunks.push(chunk);
        return oldWrite.apply(res, arguments);
    };

    res.end = function (chunk) {
        if (chunk){
            chunks.push(chunk);
        }
        if (typeof chunks[0] !== 'string' && chunks[0].toString('utf8') !== 'OK' && res.statusCode !== 404 && res.statusCode !== 500){
            let body = JSON.parse(Buffer.concat(chunks));
            memcached.set(req.params.product_id, body, 86400, (err) => {
                if (err){
                    console.log('Error caching data: ', err)
                }
            })
        }
        oldEnd.apply(res, arguments);
    };
    next();
};

module.exports = {
    saveToCache
};