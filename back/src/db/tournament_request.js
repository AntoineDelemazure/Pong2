/** 
 * @file Le fichier contenant les requetes relatives aux tournois
*/
const db = require('./db.js')
const winston = require('winston')

/**
 * Une fonction de mise en forme pour mettre une majuscule en début de chaine
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

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
                 id: elem.tournament_id,
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
        VALUES ("${tournament.date}", "${tournament.finished}", "${tournament.open}", "${tournament.current_turn}", null)`, //TO CHANGE : referee_id
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

exports.openTournament = function(id, status, callback){
    let ouvert_ferme = (status == 0 ? "fermeture" : "ouverture")
    db.Connection.getInstance().query(
        `UPDATE p_tournaments
        SET tournament_open = "${status}"
        WHERE tournament_id = "${id}"`, function(err, rows, fields){
        if(err){
            winston.log('error', `Erreur lors de l'${ouvert_ferme} du tournoi ${id}`)
            throw err
        }else{
            winston.log("info", `${ouvert_ferme.capitalize()} du tournoi n°${id}`);
            callback(rows);
        }
    })
}

exports.startTournament = function(id, status, callback){
    let debut_fin = (status == 0 ? "cloture" : "démarrage"); //Ouais ça fait une faute ! Sue me !
    db.Connection.getInstance().query(
        `UPDATE p_tournaments
        SET tournament_finished = "${status}"
        WHERE tournament_id = "${id}"`, function(err, rows, fields){
        if(err){
            winston.log('error', `Erreur lors du ${debut_fin} du tournoi ${id}`)
            throw err
        }else{
            winston.log("info", `${debut_fin.capitalize()} du tournoi n°${id}`);
            callback(rows);
        }
    })
}

exports.assignJudgeToTournament = function(id, referee_id, callback){
    db.Connection.getInstance().query(
        `UPDATE p_tournaments
        SET tournament_referee_id = "${referee_id}"
        WHERE tournament_id = "${id}"`,
        function(err, rows, fields){
        if(err){
            winston.log('error', `Erreur lors de l'assignation d'un arbitre (le joueur n°${referee_id}) au tournoi ${id}`)
            callback(err, null)
        }else{
            winston.log("info", `Assignation d'un arbitre au tournoi n°${id}`);
            callback(null, rows);
        }
    })
}

exports.nextRoundTournament = function(id, callback){
    db.Connection.getInstance().query(
        `UPDATE p_tournaments
        SET tournament_current_turn = tournament_current_turn + 1 
        WHERE tournament_id = "${id}"`, function(err, rows, fields){
        if(err){
            winston.log('error', `Erreur lors de l'assignation d'un arbitre au tournoi ${id}`)
            callback(err, null)
        }else{
            winston.log("info", `Assignation d'un arbitre au tournoi n°${id}`);
            callback(null, rows);
        }
    })
}

exports.fetchTournamentMatches = function (id, callback) {
    db.Connection.getInstance().query(`
        SELECT m.match_id, p1.player_username as player1, pl1.plays_score as score1,
        p2.player_username as player2, pl2.plays_score as score2
        FROM p_matches as m, p_players as p1, p_players as p2, p_plays as pl1, p_plays as pl2
        WHERE p1.player_id = pl1.plays_player_id
        AND p2.player_id = pl2.plays_player_id
        AND p1.player_id <> p2.player_id
        AND pl1.plays_match_id = pl2.plays_match_id
        AND pl1.plays_match_id = m.match_id
        AND m.match_tournament_id = ${id}
        GROUP BY m.match_id`,
         function (err, rows, fields) {
            if (err) {
                winston.log('error', `Erreur lors du listing des matchs du tournoi n°${id}`)
                callback(err, null)
            } else {
                callback(null, rows.map(function (elem) {
                    return {
                        match_id: elem.match_id,
                        player1: elem.player1,
                        score1: elem.score1,
                        player2: elem.player2,
                        score2: elem.score2
                    }
                }));
            }
        })
}

exports.enrollNewPlayer = function(id, joueur_id, callback){
    db.Connection.getInstance().query(
        `INSERT INTO p_participates
         VALUES ("${id}", "${joueur_id}")`,
          function(err, rows, fields){
        if(err){
            winston.log('error', `Erreur lors de l'ajout d'un joueur à un tournoi ${id}`)
            callback(err, null)
        }else{
            winston.log("info", `Ajout d'un joueur au tournoi n°${id}`);
            callback(null, rows);
        }
    })
}

exports.enrollNewPlayer = function(id, joueur_id, callback){
    db.Connection.getInstance().query(
        `DELETE FROM p_participates
         WHERE participates_player_id = "${id}"
         AND participates_tournament_id = "${joueur_id}"`,
          function(err, rows, fields){
        if(err){
            winston.log('error', `Erreur lors de l'ajout d'un joueur à un tournoi ${id}`)
            callback(err, null)
        }else{
            winston.log("info", `Ajout d'un joueur au tournoi n°${id}`);
            callback(null, rows);
        }
    })
}