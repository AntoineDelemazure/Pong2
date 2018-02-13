const player_r = require('../db/player_request');
const db = require('../db/db');

exports.fetchPlayer = function(req, res) {
    let id = req.params.id;
    let player;

    try {
        player = player_r.getPlayerByID(id);
        if (player) {
            return res.status(200).json(JSON.stringify(player));
        } else {
            return res.status(404).json(JSON.stringify(player));
        }
    } catch (err) {
        //TODO
    }
};

exports.fetchPlayers =  function(req, res) {

    try {

        player_r.getAllPlayers(function(players) {
            if (players[0]) {
                return res.status(200).json(JSON.stringify(players));
            } else {
                return res.status(404).json(JSON.stringify(players));
            }
        });

    } catch (err) {
        //TODO
    }
};

exports.sendNewPlayer = function (req, res) {

    try {
        player = JSON.stringify(req.body);
        player_r.createPlayer(player, function(resultPlayer) {
            return res.status(200);
        });

    } catch (err) {
        //TODO
    }

};