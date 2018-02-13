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

        if (player_r.getPlayerByUsername(player.username)[0]) {
            return res.status(409).body('Cet username est déjà utilisé');
        }

        player_r.createNewPlayer(player, function(resultPlayer) {
            return res.status(200);
        });

    } catch (err) {
        //TODO
    }

};

exports.authenticate = function(req, res) {

    try {

        let player = req.body;
        

    } catch (err) {
        //TODO
    }

};