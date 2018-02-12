/**
 * @file Fichier définissant les fonctions CRUD sur la bdd
 */

const db = require('./db.js');
const winston = require('winston');

exports.getPlayerByID = function(id){
    db.Connection.getInstance().query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
      });
};

exports.getAllPlayers = function(callback) {
    db.Connection.getInstance().query('SELECT * FROM p_joueurs', function(err, rows, fields) {
        if (err) {
            winston.log('error', 'Impossible de récupérer tous les joueurs');
            throw err;
        }
        winston.log('info', 'getAllPlayers');
        callback(rows);
    });
};