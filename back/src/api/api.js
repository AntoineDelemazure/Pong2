const player_r = require('../db/player_request');
const db = require('../db/db');
const jwt = require('jsonwebtoken');

exports.fetchPlayer = function(req, res) {
    let id = req.params.id;

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

exports.authenticate = function(req, res) {

    try {

        let credentials = req.body;

        player_r.getPlayerByUsername(credentials.username, function (player) {
            if (player.length) {
                if (player[0].password === credentials.password) {

                    const payload = {
                        admin: player[0].admin
                    }

                    let token = jwt.sign(payload, process.env.SECRET, {
                        expiresIn: "24h"
                    });

                    let response = {
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