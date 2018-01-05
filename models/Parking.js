const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const parkingSchema = new mongoose.Schema({
    objectId: { type: Schema.Types.ObjectId},
    nom: String,
    places: Number,
    complet: Boolean,
    ferme: Boolean,
    ouvert: Boolean,
    capacite: Number,
    id: Number,
    adresse: String,
    date_maj: String,
    automatique: String,
    taux_occup: Number,
    taux_dispo: Number,
    lien: String,
    x: Number,
    y: Number
}, { timestamps: true });

const Parking = mongoose.model('Parking', parkingSchema);
module.exports = Parking;