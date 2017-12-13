const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    objectId: { type: ObjectId, unique: true },
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