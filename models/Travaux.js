const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const travauxSchema = new mongoose.Schema({
    objectId: { type: ObjectId, unique: true },
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