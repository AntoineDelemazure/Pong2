const db = require('./db.js')
const winston = require('winston')

exports.getTournamentByID = function(id){
    db.Connection.getInstance().query('SELECT * FROM p_tournois WHERE tournoi_id = '+ id, function(err, rows, fields) {
        if (err) {
            winston.log("error", "Récupération du tournoi n°" + id);
            throw err;
        }
        winston.log("info", "Récupération du tournoi n°" + id);
        return rows;
      });
}