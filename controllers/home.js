const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'), {
    multiArgs: true
});

/**
 * GET /
 * data page.
 */

const Parking = require('../models/Parking.js');
const Travaux = require('../models/Travaux.js');

exports.index = (req, res) => {


    Travaux.find((err, docs) => {
        Parking.find((err, docs2) => {
            res.render('home', {
                parking: docs2,
                travaux: docs,
                title: 'Carte informative'
            });
        });

    });

};
