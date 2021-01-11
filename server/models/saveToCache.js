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
        if (typeof chunks[0] !== 'string' && chunks[0].toString('utf8') !== 'OK' && res.status == 200){
            let body = JSON.parse(Buffer.concat(chunks));
            memcached.set(req.params.product_id, body, 3600, (err) => {
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