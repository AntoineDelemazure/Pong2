/** 
 * @file Le "répertoire" des requêtes en relation avec la table player
 * Les fonctions "query" étant assynchrone, elles prennent en paramêtre un callback, fonction qui s'occupera du traitement du résulat
 * (dans le contexte, l'envoyer par exemple)
*/

const db = require('./db.js')
const winston = require('winston')


/**
 * Recupération d'un joueur par son id
 * Ne servira probablement pas
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
 * La même chose avec le username
 * Oui c'est presque pareil que la précédente, non j'ai pas envie de me faire chier
 * Le dite pas à M. Michel
 */
exports.getPlayerByUsername = function(username, callback){
    db.Connection.getInstance().query('SELECT * FROM p_joueurs WHERE joueur_username = "'+ username+'"', function(err, rows, fields) {
        if (err) {
            winston.log("error", "Récupération du joueur " + username);
            throw err;
        }
        winston.log("info", "Récupération du joueur " + username);
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
 * @param Un joueur
 * @param {function} la fonction qui sera appelé après, pour faire quelque chose du résultat
 */
/*
//Cette fonction est pour l'instant inutile.
exports.updatePlayer = function(player, callback){
    db.Connection.getInstance().query(
        'UPDATE p_joueurs SET joueur_nom = "' + player.joueur_nom + '",'+
        'joueur_prenom = "' + player.joueur_prenom + '",'+
        'joueur_rang = "' + player.joueur_rang + '",'+
        'joueur_username = "' + player.joueur_username + '",'+
        'joueur_mail = "' + player.joueur_mail + '",'+
        'joueur_password = "' + player.joueur_password + '",'+
        'joueur_admin = "' + player.joueur_admin + '",'+
        'WHERE joueur_id = "' + player.joueur_id + '"', 
        function(err, row, field){
            if (err) {
                winston.log("error", "Mise à jour du joueur "+ player.joueur_username);
                throw err;
            }
            winston.log("info", "Mise à jour du joueur "+ player.joueur_username);
            callback(row);
     })
}
*/

/**
 * Création d'un nouveau joueur
 * @param le joueur 
 */
exports.createPlayer = function(player, callback){
    db.Connection.getInstance().query(
        'INSERT INTO p_joueurs (joueur_nom, joueur_prenom, joueur_rang, joueur_username, joueur_mail, joueur_password, joueur_admin) VALUES ('+
        '"' + player.joueur_nom + '",'+
        '"' + player.joueur_prenom + '",'+
        '"' + player.joueur_rang + '",'+
        '"' + player.joueur_username + '",'+
        '"' + player.joueur_mail + '",'+
        '"' + player.joueur_password + '",'+
        '"' + player.joueur_admin + '")', 
        function(err, row, field){
            if (err) {
                winston.log("error", "Creation du joueur "+ player.joueur_username);
                throw err;
            }
            winston.log("info", "Creation du joueur "+ player.joueur_username);
            callback(row);
     })
}

exports.getAllPlayers = function() {
    db.Connection.getInstance().query('SELECT * FROM p_joueurs', function(err, rows, fields) {
        if (err) {
            winston.log('error', 'Impossible de récupérer tous les joueurs');
            throw err;
        }
        winston.log('info', '');
        return(rows);
    });
};

exports.deletePlayer = function(username, callback){
    db.Connection.getInstance().query('DELETE FROM p_joueurs WHERE joueur_username = "'+username+'"',
    function(err, rows, fields){
        if(err){
            winston.log("error", "Erreur pendant la suppression de l'utilisateur " +username)
            throw err
        }
        winston.log("info","Suppression du joueur " + username)
        callback(rows);
    })
}
