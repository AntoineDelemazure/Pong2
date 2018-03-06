/** 
 * @file Le fichier contenant les requetes relatives aux tournois
*/
const db = require('./db.js')
const winston = require('winston')

/**
 * Recherche un tournoi via son id
 * @param {number} id Le numéro du tournoi recherché
 */
exports.getTournamentByID = function(id){
    db.Connection.getInstance().query('SELECT * FROM p_tournaments WHERE tournoi_id = '+ id, function(err, rows, fields) {
        if (err) {
            winston.log("error", "Récupération du tournoi n°" + id);
            throw err;
        }
        winston.log("info", "Récupération du tournoi n°" + id);
        return rows;
      });
}

exports.getAllTournaments = function(callback){
    db.Connection.getInstance().query('SELECT * FROM p_tournaments', function(err, rows, fields){
        if(err){
            winston.log('error', 'Récupération de tout les tournois');
            throw(err);
        }
        winston.log('info', 'Récupération de tout les tournois');
        callback(rows.map(function(elem){
            return {
                 date: elem.tournament_date,
                 finished: elem.tournament_finished,
                 open: elem.tournament_open,
                 current_turn: elem.tournament_current_turn,
                 referee_id: elem.tournament_referee
            }
        }));
    });
}