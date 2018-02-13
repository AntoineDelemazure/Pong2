const player_r = require('../db/player_request');
const db = require('../db/db');

exports.fetchPlayer = function(req, res) {
    let id = req.params.id;

    try {
        player_r.getPlayerByID(id, function (player) {
            if (player) {
                return res.status(200).json(player);
            } else {
                return res.status(404).json(player);
            }
        });
    } catch (err) {
        //TODO
    }
};

exports.fetchPlayers =  function(req, res) {

    try {

        player_r.getAllPlayers(function(players) {
            return res.status(200).json(players);
        });

    } catch (err) {
        //TODO
    }
};

exports.sendNewPlayer = function (req, res) {

    try {
        let player = req.body;

        // if (player_r.getPlayerByUsername(player.joueur_username)[0]) {
        //     return res.status(409).body('Cet username est déjà utilisé');
        // }

        player_r.createNewPlayer(player, function(resultPlayer) {
            return res.status(200);
        });

    } catch (err) {
        //TODO
    }

};

exports.authenticate = function(req, res) {

    try {

        let credentials = req.body;

        player_r.getPlayerByUsername(credentials.joueur_username, function (player) {
            if (player) {
                if (player.joueur_password === credentials.joueur_password) {
                    let body = {
                        joueur_id: player.joueur_id,
                        joueur_nom: player.joueur_nom,
                        joueur_prenom: player.joueur_prenom,
                        joueur_rang: player.joueur_rang,
                        joueur_mail: player.joueur_mail,
                        joueur_username: player.joueur_username,
                        token: 'yolo-token'
                    };

                    return res.status(200).body(body);
                }
            }
            return res.status(400).body('Identifiants inconnus');
        });

    } catch (err) {
        //TODO
    }

};