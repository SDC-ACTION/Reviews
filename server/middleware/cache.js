const { checkCache } = require('../models/checkCache.js');
const { deleteFromCache } = require('../models/deleteFromCache.js');

const cache = (req, res, next) => {
    checkCache(req, res, next);
};

module.exports = {
    cache
};