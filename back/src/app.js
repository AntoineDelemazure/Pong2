/**
 * @file Base de l'application
 */

require('colors'); //Couleurs dans la console
require('dotenv').config(); //Chargement du fichier .env
const winston = require('winston');

const express = require('express'); //Framework
const bodyParser = require('body-parser'); //Pour parser le json automatiquement
const cors = require('cors'); //Pour activer les requêtes cross-origin

const app = express(); //Initialisation de l'application

const db = require("./db/db");
const routes = require('./routes/routes');


winston.add(winston.transports.File, { filename: '../logs/log.log' });

// Autorisation des requêtes cross-origin
app.use(cors());

// Définition du port du serveur
let port = process.env.PORT || 1337;
app.set('port', port);

// Chargement du bodyparser dans l'application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Initialisation de la base de données
db.init((error, result) => {
    if (error) {
        process.exit(0);
    }

    db.checkDBTables((error, result) => {
        if (error) {
            process.exit(0);
        }
    });

});

// Initialisation des routes du routeur
let router = express.Router();
routes.doRouting(router);

// Préfixage des routes par '/api'
app.use('/api', router);

// Start du serveur
app.listen(app.get('port'), function () {
    console.log('App listening on port 1337')
});

