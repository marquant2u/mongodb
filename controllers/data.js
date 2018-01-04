const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'), {
    multiArgs: true
});

const mongoose = require('mongoose');
let conn = mongoose.connection;

let urlParking ="https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Parking/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
let urlWorks = "https://geoservices.grand-nancy.org/arcgis/rest/services/public/VOIRIE_Info_Travaux_Niveau/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";

/**
 * GET /
 * data page.
 */
exports.loadApiParking = (req, res) => {

    request.get(urlParking, (err, request, body) => {
        if (err) {
            // Recupere les donnees du parking
            let b = '';
            res.on('data', (data) => {
              b += data;
            }).on('end', () => {
              let parkings = JSON.parse(b).features;
              for (let i = 0; i < parkings.length; i++) {

                let attributes = parkings[i].attributes;
                let geometry = parkings[i].geometry;

                var parkingInsert = {
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
                }
                // Insertion dans la Bdd
                conn.collection('parking').insert(parkingInsert);
              }
            }).on('error', (e) => {
              console.log('Error : ' + e.message);
            });

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

exports.loadApiTravaux = (req, res) => {

    request.get(urlWorks, (err, request, body) => {
        console.log(err);
        if (err) {
            // Recupere les donnees du parking
            let b = '';
            res.on('data', (data) => {
              b += data;
            }).on('end', () => {
              let works = JSON.parse(b).features;
              for (let i = 0; i < works.length; i++) {

                let attributes = works[i].attributes;
                let geometry = works[i].geometry;

                var workInsert = {
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
                }
                // Insertion dans la Bdd
                conn.collection('work').insert(workInsert);
              }
            }).on('error', (e) => {
              console.log('Error : ' + e.message);
            });

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