/**
 * @file Fichier contenant les différentes fonctions appelées par les routes.
 * 
 * Si il existe encore des try/catch au moment ou vous lisez ces lignes,
 * n'hésitez pas à prendre le temps de les enlever, ils ne servent à rien.
 * Vous pourrez trouver des exemples de bonnes pratiques dans les fonctions qui n'en contiennent pas
 * (avec des callbacks)
 */

const player_r = require('../db/player_request');
const tournaments_r = require('../db/tournament_request')
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
    winston.log('info', 'GET on /players/'+id);

    player_r.getPlayerByID(id, (error, player) => {
        if (error) {
            return res.status(500).end();
        }
        if (!player.length) {
            return res.status(404).end({error: 'Cet utilisateur n\'existe pas'});
        }
        return res.status(200).json(player[0]);
    });
};

/**
 * Répond à la requête /players
 * Renvoie en JSON tout les joueurs en base
 * @param {object} req - la requete (sous forme d'objet JS)
 * @param {object} res - la réponse à la requete. Elle est envoyée juste après avoir été initialisée.
 */
exports.fetchPlayers =  function(req, res) {
    winston.log('info', 'GET on /players');
    player_r.getAllPlayers((error, players) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json(players);
    });
};

/**
 * Répond à la requête /singup
 * Crée un nouveau joueur en base
 * @param {object} req - la requete (sous forme d'objet JS), on récupère dans le corps les identifiants donnés
 * @param {object} res - la réponse à la requete. Elle est envoyée juste après avoir été initialisée.
 */
exports.sendNewPlayer = function (req, res) {
    winston.log('info', 'POST on /signup');

    let newplayer = req.body;
	newplayer.admin = 0;

    player_r.getPlayerByUsername(newplayer.username, (error, player) => {
        if (error) {
            return res.status(500).json();
        }
        if (player.length){
            return res.status(409).json({error: 'Cet username est déjà utilisé'});
        }
        player_r.createNewPlayer(newplayer, function(error) {
            if (error) {
                return res.status(500).json();
            }
            return res.status(200).end();
        });
    });
};

/**
 * Répond à la requête /signin
 * Permet la connexion, renvoie un token. Le token contient le statut admin du joueur connecté et a une validité de 24h.
 * @param {object} req - la requete (sous forme d'objet JS), on recupere dans le corps les identifiants donnés
 * @param {object} res - la réponse à la requete. Elle est envoyée juste après avoir été initialisée.
 */
exports.authenticate = function(req, res) {
    winston.log('info', 'POST on /singin');
    let credentials = req.body;

    player_r.getPlayerByUsername(credentials.username, (error, player) => {
        if (error) {
            return res.status(500).json();
        }
        if (player.length) {
            if (crypt.compare(credentials.password, player[0].password, player[0].salt)) {

                const payload = {
                    admin: player[0].admin
                };

                let token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: "24h"
                });

                let response = {
                    id: player[0].id,
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
};


exports.fetchTournaments = function(req, res){
    winston.log('info', 'GET on /tournaments. GET ALL THE TOURNAMENTS !')
    try{
        tournaments_r.getAllTournaments(function(tournaments){
            return res.status(200).json(tournaments);
        })
    }catch(err){
        //TODO
    }
}

exports.createNewTournament = function(req, res){
    winston.log('info', "POST on /tournaments. Time for a new tournament")
    try{
        tournaments_r.createTournament(req.body, function(tournament){
            return res.status(200).json({"info": "Tout s'est bien passé"});
        })
    }catch(err){
        //TODO
    }
}

exports.fetchTournament = function(req, res){
    winston.log('info', "GET on /tournament/id, give me the tournament I need")
    try{
        id = req.params.id
        tournaments_r.getTournamentByID(id, function(tournament){
            return res.status(200).json(tournament);
        })
    }catch(err){
        //TODO
    }
}

exports.openTournament = function(req, res){
    winston.log('info', "PUT on /tournament/id/open")
    try{
        id = req.params.id
        tournaments_r.openTournament(id, 1,  function(tournament){
            return res.status(200).json({"info": `Le tournoi ${id} est ouvert !`});
        })
    }catch(err){
        //TODO
    }
}

exports.startTournament = function(req, res){
    winston.log('info', "PUT on /tournament/id/start")
    try{
        id = req.params.id
        console.log("pouet")
        tournaments_r.startTournament(id, 1, function(tournament){
            return res.status(200).json({"info": `Le tournoi ${id} commence !`});
        })
    }catch(err){
        //TODO
    }
}

exports.closeTournanment = function(req, res){
    winston.log('info', "PUT on /tournament/id/close")
    try{
        id = req.params.id
        tournaments_r.openTournament(id, 0,  function(tournament){
            return res.status(200).json({"info": `Le tournoi ${id} est fermé !`});
        })
    }catch(err){
        //TODO
    }
}

exports.finishTournament = function(req, res){
    winston.log('info', "PUT on /tournament/id/finish")
    try{
        id = req.params.id
        tournaments_r.startTournament(id, 0, function(tournament){
            return res.status(200).json({"info": `Le tournoi ${id} est terminé !`});
        })
    }catch(err){
        console.log(err)
    }
}

exports.assignJudgeToTournament = function(req, res){
    winston.log('info', "PUT on /tournament/id/assign")
    try{
        id = req.params.id
        referee = req.body.referee_id
        tournaments_r.assignJudgeToTournament(id, referee, function(tournament){
            return res.status(200).json({"info": `Le joueur ${referee} est désormais l'arbitre pour le tournoi n°${id} !`});
        })
    }catch(err){
        console.log(err)
    }
}

exports.nextRoundTournament =  function(req, res){
    winston.log('info', "PUT on /tournament/id/nextround")
    try{
        id = req.params.id
        tournaments_r.nextRoundTournament(id, function(err, tournament){
            if(err == null)
                return res.status(200).json({"info": `Le tournoi ${id} passe au tour suivant !`});
            else
                winston.log('error', err) 
        })
    }catch(err){
        console.log(err)
    }
}

exports.fetchTournamentMatches = function(req, res){
    winston.log('info', "GET on /tournament/id/matches")
    try{
        id = req.params.id_t
        tournaments_r.fetchTournamentMatches(id, function(err, matches){
            if(err == null)
                return res.status(200).json(matches);
            else
                winston.log('error', err) 
        })
    }catch(err){
        console.log(err)
    }
}

exports.enrollNewPlayer = function(req, res){
    winston.log('info', "POST on /tournament/id/players")
    try{
        id = req.params.id
        id_joueur = req.body.player_id
        tournaments_r.enrollNewPlayer(id, id_joueur, function(err, insert_result){
            if(err == null){
                winston.log("info", `retour de l'insert : ${insert_result}`)
                return res.status(200).json({"info": `Le tournoi ${id} a un nouveau joueur !`});
            } else
                winston.log('error', err) 
        })
    }catch(err){
        console.log(err)
    }
}

exports.excludePlayer = function(req, res){
    winston.log('info', "DELETE on /tournament/id/players")
    try{
        id = req.params.id
        id_joueur = req.body.player_id
        tournaments_r.excludePlayer(id, id_joueur, function(err, tournament){
            if(err == null)
                return res.status(200).json({"info": `Le tournoi ${id} a un joueur de moins !`});
            else
                winston.log('error', err) 
        })
    }catch(err){
        console.log(err)
    }
}



