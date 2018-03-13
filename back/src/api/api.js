/** 
 * @file Fichier contenant les différentes fonctions appelées par les routes.
*/

const player_r = require('../db/player_request');
const db = require('../db/db');
const crypt = require('../utils/crypt');
const winston = require('winston');
const jwt = require('jsonwebtoken'); // La librairie qui permet de générer des tokens

/**
 * Répond à la requête /players/id
 * Renvoie en JSON le joueur correspondant à la valeur id
 * @param {object} req - la requete (sous forme d'objet JS), on y récupere l'id
 * @param {object} res - la réponse à la requete. Elle est envoyée juste après avoir été initialisée.
 */
exports.fetchPlayer = function(req, res) {
    let id = req.params.id;
    winston.log('info', 'GET on /players/'+id)

    try {
        player_r.getPlayerByID(id, function (player) {
            if (player.length) {
                return res.status(200).json(player[0]);
            } else {
                return res.status(404).end();
            }
        });
    } catch (err) {
        //TODO
    }
};

/**
 * Répond à la requête /players
 * Renvoie en JSON tout les joueurs en base
 * @param {object} req - la requete (sous forme d'objet JS)
 * @param {object} res - la réponse à la requete. Elle est envoyée juste après avoir été initialisée.
 */
exports.fetchPlayers =  function(req, res) {
    winston.log("info", "GET on /players. SEND ALL THE PLAYERS !")
    try {

        player_r.getAllPlayers(function(players) {
            return res.status(200).json(players);
        });

    } catch (err) {
        //TODO
    }
};

/**
 * Répond à la requête /singup
 * Crée un nouveau joueur en base
 * @param {object} req - la requete (sous forme d'objet JS), on récupère dans le corps les identifiants donnés
 * @param {object} res - la réponse à la requete. Elle est envoyée juste après avoir été initialisée.
 */
exports.sendNewPlayer = function (req, res) {
    winston.log('info', 'POST on /signup. "Un nouveau joueur ! Venu d\'ailleurs ! -Ooooooh !')
    try {
        let newplayer = req.body;

        player_r.getPlayerByUsername(newplayer.username, function (player) {
            if (player.length){
                return res.status(409).json({error: 'Cet username est déjà utilisé'});
            }
            player_r.createNewPlayer(newplayer, function() {
                return res.status(200).end();
            });
        });

    } catch (err) {
        //TODO
    }

};

/**
 * Répond à la requête /signin
 * Permet la connexion, renvoie un token. Le token contient le statut admin du joueur connecté et a une validité de 24h.
 * @param {object} req - la requete (sous forme d'objet JS), on recupere dans le corps les identifiants donnés
 * @param {object} res - la réponse à la requete. Elle est envoyée juste après avoir été initialisée.
 */
exports.authenticate = function(req, res) {
    winston.log('info', 'POST on /singin. Tentative de connexion d\'un joueur');
    try {
        let credentials = req.body;

        player_r.getPlayerByUsername(credentials.username, function (player) {
            if (player.length) {
                // winston.log('info', `${crypt.sha512(player[0].password, player[0].salt)}`);
                // winston.log('info', `${player[0].password}`);
                if (crypt.compare(credentials.password, player[0].password, player[0].salt)) {

                    const payload = {
                        admin: player[0].admin
                    };

                    let token = jwt.sign(payload, process.env.SECRET, {
                        expiresIn: "24h"
                    });

                    let response = {
                        firstname: player[0].firstname,
                        lastname: player[0].lastname,
                        username: player[0].username,
                        rank: player[0].rank,
                        email: player[0].email,
                        isadmin: player[0].admin,

                        token: token
                    };

                    return res.status(200).json(response);
                }
            }
            return res.status(400).json({error: 'Identifiants inconnus'});
        });

    } catch (err) {
        //TODO
    }

};