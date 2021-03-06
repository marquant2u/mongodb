const http = require('http');
const https = require('https');
const bluebird = require('bluebird');
var Parking = require('../models/Parking');
var Travaux = require('../models/Travaux');
const request = bluebird.promisifyAll(require('request'), {
    multiArgs: true
});

const mongoose = require('mongoose');
let conn = mongoose.connection;

let urlParking = "https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
let urlWorks = "https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Info_Travaux_Niveau/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";

/**
 * GET /
 * data page.
 */
exports.loadApiParking = (req, res) => {
    this.resfreshParking();
    res.render('home', {
        title: 'Home',
    });
};

exports.resfreshParking = () => {
    
    Parking.deleteMany({});
    
    https.get(urlParking, (result) => {
        // Recupere les donnees du parking
        let body = '';
        result.on('data', (data) => {
            body += data;
        }).on('end', () => {
            let parkings = JSON.parse(body).features;
            for (let i = 0; i < parkings.length; i++) {

                let attributes = parkings[i].attributes;
                let geometry = parkings[i].geometry;
                
                Parking.create({
                    nom: attributes['NOM'],
                    places: attributes['PLACES'],
                    complet: attributes['COMPLET'],
                    ferme: attributes['FERME'],
                    ouvert: attributes['OUVERT'],
                    capacite: attributes['CAPACITE'],
                    id: attributes['ID'],
                    adresse: attributes['ADRESSE'],
                    date_maj: attributes['DATE_MAJ'],
                    automatique: attributes['AUTOMATIQUE'],
                    taux_occup: attributes['TAUX_OCCUP'],
                    taux_dispo: attributes['TAUX_DISPO'],
                    lien: attributes['LIEN'],
                    x: geometry['x'],
                    y: geometry['y']
                }, function (err, res) {
                    console.log(err);
                })

            }
        });
    });
}

exports.loadApiTravaux = (req, res) => {
    this.refreshWorks();
    res.render('home', {
        title: 'Home',
    });
};

exports.refreshWorks = () => {
    
    Travaux.deleteMany({});
    
    https.get(urlWorks, (result) => {
        // Recupere les donnees du parking
        let body = '';
        result.on('data', (data) => {
            body += data;
        }).on('end', () => {
            let works = JSON.parse(body).features;
            for (let i = 0; i < works.length; i++) {

                let attributes = works[i].attributes;
                let geometry = works[i].geometry;

                Travaux.create({
                    type_intervention: attributes['TYPE_INTERVENTION'],
                    libelle_travaux: attributes['LIBELLE_TRAVAUX'],
                    intervenant: attributes['INTERVENANT'],
                    niveau_gene: attributes['NIVEAU_GENE'],
                    descr_gene: attributes['DESCR_GENE1'],
                    descr_gene2: attributes['DESCR_GENE2'],
                    descr_gene3: attributes['DESCR_GENE3'],
                    adresse: attributes['ADRESSE'],
                    commune: attributes['COMMUNE'],
                    auteur: attributes['AUTEUR'],
                    modifie_par: attributes['MODIFIE_PAR'],
                    selection: attributes['SECTION'],
                    delestage_deviation: attributes['DELESTAGE_DEVIATION'],
                    date_debut: attributes['DATE_DEBUT'],
                    date_fin: attributes['DATE_FIN'],
                    x: geometry['x'],
                    y: geometry['y']
                }, function (err, res) {
                    console.log(err);
                })
            }
        });
    });
}
