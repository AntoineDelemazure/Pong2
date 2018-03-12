/** 
 * @file Le fichier contenant les requetes relatives aux tournois
*/
const db = require('./db.js')
const winston = require('winston')

/**
 * Recherche un tournoi via son id
 * @param {number} id Le numéro du tournoi recherché
 */
exports.getTournamentByID = function(id, callback){
    db.Connection.getInstance().query(`SELECT * FROM p_tournaments WHERE tournament_id = ${id}`, function(err, rows, fields) {
        if (err) {
            winston.log("error", "Récupération du tournoi n°" + id);
            throw err;
        }
        winston.log("info", "Récupération du tournoi n°" + id);
        callback(rows);
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

exports.createTournament = function(tournament, callback){
    db.Connection.getInstance().query(`INSERT INTO p_tournaments 
        (tournament_date, tournament_finished, tournament_open, tournament_current_turn, tournament_referee_id)
        VALUES ("${tournament.date}", "${tournament.finished}", "${tournament.open}", "${tournament.current_turn}", "${tournament.referee_id}")`,
        function(err, rows, fields){
            if(err){
                winston.log('error', "Erreur lors de la création d'un nouveau tournoi")
                throw err
            }else{
                winston.log("info", "Creation d'un tournoi");
                callback(rows);
            }
    })
}

exports.openTournament = function(id, callback){
    db.Connection.getInstance().query(
        `UPDATE p_tournaments
        SET tournament_open = "1"
        WHERE tournament_id = "${id}"`, function(err, rows, fields){
        if(err){
            winston.log('error', `Erreur lors de l'ouverture du tournoi ${id}`)
            throw err
        }else{
            winston.log("info", `Ouverture du tournoi n°${id}`);
            callback(rows);
        }
    })
}