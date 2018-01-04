const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'), {
    multiArgs: true
});

/**
 * GET /
 * data page.
 */
exports.index = (req, res) => {

    res.render('home', {
        title: 'Home',
    });

};
