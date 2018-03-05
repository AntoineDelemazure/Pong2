/**
 * @file Le "répertoire" des requêtes en relation avec la table player
 * Les fonctions "query" étant asynchrones, elles prennent en paramètre un callback, fonction qui s'occupera du traitement du résulat
 * (dans le contexte, l'envoyer par exemple)
 */

const db = require('./db.js')
const winston = require('winston')


/**
 * Recupération d'un joueur par son id
 * Ne servira probablement pas
 * @param {number} id - id du joueur recherché
 * @param {function} callback - fonction qui sera appelé après, pour faire quelque chose du résultat (ah, les joies de l'assynchrone)
 */
exports.getPlayerByID = function(id, callback){
    db.Connection.getInstance().query('SELECT * FROM p_joueurs WHERE joueur_id = '+ id, function(err, rows) {
        if (err) {
            winston.log("error", "Récupération du joueur n°" + id);
            throw err;
        }
        winston.log("info", "Récupération du joueur n°" + id);
        if (rows.length) {
            callback(
                [{
                    lastname: rows[0].joueur_nom,
                    firstname: rows[0].joueur_prenom,
                    rank: rows[0].joueur_rang,
                    email: rows[0].joueur_mail,
                    username: rows[0].joueur_username,
                    password: rows[0].joueur_password,
                    admin: rows[0].joueur_admin
                }]
            );
        } else {
            callback(rows);
        }
    });
}

/**
 * Recupération du mot de passe d'un joueur par son username (pour l'authentification)
 * @param {number} username du joueur recherché
 * @param {function} la fonction qui sera appelé après, pour faire quelque chose du résultat
 */
exports.getPlayerPasswordByUsername = function(username, callback){
    db.Connection.getInstance().query('SELECT joueur_password FROM p_joueurs WHERE p_joueurs.joueur_username = "'+ username +'"', function(err, rows) {
        if (err) {
            winston.log("error", "Récupération du mot de passe du joueur "+ username);
            throw err;
        }
        winston.log("info", "Récupération du mot de passe du joueur "+ username);
        if (rows.length) {
            callback(
                [{password: rows.joueur_password}]
            );
        } else {
            callback(rows);
        }
    });
}

/**
 * Recupération d'un joueur par son username (pour l'authentification)
 * @param {number} username du joueur recherché
 * @param {function} la fonction qui sera appelé après, pour faire quelque chose du résultat
 */
exports.getPlayerByUsername = function(username, callback){
    db.Connection.getInstance().query('SELECT * FROM p_joueurs WHERE p_joueurs.joueur_username = "'+ username +'"', function(err, rows) {
        if (err) {
            winston.log("error", "Récupération du joueur par username "+ username);
            throw err;
        }
        winston.log("info", "Récupération du joueur "+ username);
        if (rows.length){
            callback(
                [{
                    lastname: rows[0].joueur_nom,
                    firstname: rows[0].joueur_prenom,
                    rank: rows[0].joueur_rang,
                    email: rows[0].joueur_mail,
                    username: rows[0].joueur_username,
                    password: rows[0].joueur_password,
                    admin: rows[0].joueur_admin}]
            );
        } else {
            callback(rows);
        }
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
        'UPDATE p_joueurs SET joueur_nom = "' + player.lastname + '",'+
        'joueur_prenom = "' + player.firstname + '",'+
        'joueur_rang = "' + player.rank + '",'+
        'joueur_username = "' + player.username + '",'+
        'joueur_mail = "' + player.email + '",'+
        'joueur_password = "' + player.password + '",'+
        'joueur_admin = "' + player.admin + '",'+
        'WHERE joueur_id = "' + player.id + '"',
        function(err, rows){
            if (err) {
                winston.log("error", "Mise à jour du joueur "+ player.username);
                throw err;
            }
            winston.log("info", "Mise à jour du joueur "+ player.username);
            callback(rows);
        })
}
*/

/**
 * Création d'un nouveau joueur
 * @param {object} player - joueur, dans un objet javascript
 * @param {function} callback - fonction qui traitera les données retournées
 */
exports.createNewPlayer = function(player, callback){
    db.Connection.getInstance().query(
        'INSERT INTO p_joueurs (joueur_nom, joueur_prenom, joueur_rang, joueur_username, joueur_mail, joueur_password, joueur_admin) VALUES ('+
        '"' + player.lastname + '",'+
        '"' + player.firstname + '",'+
        '"' + player.rank + '",'+
        '"' + player.username + '",'+
        '"' + player.email + '",'+
        '"' + player.password + '",'+
        '"' + player.admin + '")',
        function(err, rows){
            if (err) {
                winston.log("error", "Creation du joueur "+ player.username);
                throw err;
            }
            winston.log("info", "Creation du joueur "+ player.username);
            callback(rows);
        })
}

/**
 * Retourne l'ensemble des joueurs stockés dans la base de l'application
 * @param callback - fonction traitant les données de retour
 */
exports.getAllPlayers = function(callback) {
    db.Connection.getInstance().query('SELECT * FROM p_joueurs', function(err, rows, fields) {
        if (err) {
            winston.log('error', 'Impossible de récupérer tous les joueurs');
            throw err;
        }
        winston.log('info', 'Récupération de tous les joueurs');
        callback(rows.map(function(elem) {
            return {lastname: elem.joueur_nom,
                firstname: elem.joueur_prenom,
                rank: elem.joueur_rang,
                email: elem.joueur_mail,
                username: elem.joueur_username,
                password: elem.joueur_password,
                admin: elem.joueur_admin}
        }));
    });
};

exports.deletePlayer = function(username, callback){
    db.Connection.getInstance().query('DELETE FROM p_joueurs WHERE joueur_username = "'+username+'"',
    function(err, rows){
        if(err){
            winston.log("error", "Erreur pendant la suppression de l'utilisateur " +username)
            throw err
        }
        winston.log("info","Suppression du joueur " + username)
        callback(rows);
    })
}
