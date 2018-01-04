const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'), {
    multiArgs: true
});

/**
 * GET /
 * data page.
 */
exports.loadApiTravaux = (req, res) => {

    request.get('https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Info_Travaux_Niveau/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson', (err, request, body) => {
        if (err) {
            return next(err);
        }
        if (request.statusCode === 403) {
            return next(new Error('Invalide'));
        }
        res.render('home', {
            title: 'Home',
            body
        });
    });

};

exports.loadApiParking = (req, res) => {
    let data = 'test';

    request.get('https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson', (err, request, body) => {
        if (err) {
            return next(err);
        }
        if (request.statusCode === 403) {
            return next(new Error('Invalide'));
        }
        res.render('home', {
            title: 'Home',
            body
        });
    });
};
