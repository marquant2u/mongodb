const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const travauxSchema = new mongoose.Schema({
    objectId: { type: Schema.Types.ObjectId},
    type_intervention: String,
    libelle_travaux: String,
    intervenant: String,
    niveau_gene: String,
    descr_gene: String,
    descr_gene2: String,
    descr_gene3: String,
    adresse: String,
    commune: String,
    auteur: String,
    modifie_par: String,
    selection: String,
    delestage_deviation: String,
    date_debut: Date,
    date_fin: Date,
    x: Number,
    y: Number
}, { timestamps: true });

const Travaux = mongoose.model('Travaux', travauxSchema);
module.exports = Travaux;