/** 
 * @file Le "répertoire" des requêtes en relation avec la table player
 * Les fonctions "query" étant asynchrone, elles prennent en paramêtre un callback, fonction qui s'occupera du traitement du résulat
 * (dans le contexte, l'envoyer par exemple)
*/

const db = require('./db.js')
const winston = require('winston')


/**
 * Recupération d'un joueur par son id
 * @param {number} l'id du joueur recherché
 * @param {function} la fonction qui sera appelé après, pour faire quelque chose du résultat (ah, les joies de l'assynchrone)
 */
exports.getPlayerByID = function(id, callback){
    db.Connection.getInstance().query('SELECT * FROM p_joueurs WHERE joueur_id = '+ id, function(err, rows, fields) {
        if (err) {
            winston.log("error", "Récupération du joueur n°" + id);
            throw err;
        }
        winston.log("info", "Récupération du joueur n°" + id);
        callback(rows);
      });
}

/**
 * Recupération d'un joueur par son username (pour l'authentification)
 * @param {number} username du joueur recherché
 * @param {function} la fonction qui sera appelé après, pour faire quelque chose du résultat
 */
exports.getPlayerPasswordByUsername = function(username, callback){
    db.Connection.getInstance().query('SELECT joueur_password FROM p_joueurs WHERE p_joueurs.joueur_username = "'+ username +'"', function(err, rows, fields) {
        if (err) {
            winston.log("error", "Récupération du mot de passe du joueur "+ username);
            throw err;
        }
        winston.log("info", "Récupération du mot de passe du joueur "+ username);
        callback(rows);
      });
}

/**
 * Mise à jour d'un joueur, prend du json en entrée
 * @param Un truc en json
 * @param {function} la fonction qui sera appelé après, pour faire quelque chose du résultat
 */
// TODO: Tester le json pour s'assurer que c'est un joueur.
exports.updatePlayer = function(player, callback){
    let p = JSON.parse(player);
    db.Connection.getInstance().query(
        'UPDATE p_joueurs SET joueur_nom = "' + p.joueur_nom + '",'+
        'joueur_prenom = "' + p.joueur_prenom + '",'+
        'joueur_rang = "' + p.joueur_rang + '",'+
        'joueur_username = "' + p.joueur_username + '",'+
        'joueur_mail = "' + p.joueur_mail + '",'+
        'joueur_password = "' + p.joueur_password + '",'+
        'joueur_admin = "' + p.joueur_admin + '",'+
        'WHERE joueur_id = "' + p.joueur_id + '"', 
        function(err, row, field){
            if (err) {
                winston.log("error", "Mise à jour du joueur "+ p.joueur_username);
                throw err;
            }
            winston.log("info", "Mise à jour du joueur "+ p.joueur_username);
            callback(rows);
     })
}

/**
 * Création d'un nouveau joueur
 * @param le joueur, en json 
 */
exports.createPlayer = function(player, callback){
    let p = JSON.parse(player);
    db.Connection.getInstance().query(
        'INSERT INTO p_joueurs (joueur_prenom, joueur_rang, joueur_username, joueur_mail, joueur_password, joueur_admin) VALUES '+
        '"' + p.joueur_rang + '",'+
        '"' + p.joueur_username + '",'+
        '"' + p.joueur_mail + '",'+
        '"' + p.joueur_password + '",'+ //TODO : salt + hash
        '"' + p.joueur_admin + '"', 
        function(err, row, field){
            if (err) {
                winston.log("error", "Creation du joueur "+ p.joueur_username);
                throw err;
            }
            winston.log("info", "Creation du joueur "+ p.joueur_username);
            callback(rows);
     })
}

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
