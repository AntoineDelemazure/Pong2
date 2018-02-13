const api = require('../api/api');

exports.doRouting = function(router) {
    router.get('/players/:id', api.fetchPlayer);
    router.get('/players', api.fetchPlayers);
    router.post('/login', api.sendNewPlayer)
};