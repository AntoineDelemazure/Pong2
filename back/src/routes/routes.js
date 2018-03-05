const api = require('../api/api');

exports.doRouting = function(router) {
    router.get('/players/:id', api.fetchPlayer);
    router.get('/players', api.fetchPlayers);
    router.post('/signup', api.sendNewPlayer);
    router.post('/signin', api.authenticate);
    // router.get('/tournaments', api.fetchTournaments);
    // router.post('/tournaments', api.createNewTournament);
    // router.get('/tournaments/:id', api.fetchTournament);
    // router.put('/tournaments/:id/open', api.openTournament);
    // router.put('/tournaments/:id/start', api.startTournament);
    // router.put('/tournaments/:id/close', api.closeTournanment);
    // router.put('/tournaments/:id/assign', api.assignJudgeToTournament);
    // router.put('/tournaments/:id/finish', api.finishTournament);
    // router.put('/tournaments/:id/nextround', api.nextRoundTournament);
    // router.get('/tournaments/:id_t/matches', api.fetchTournamentMatches);
    // router.put('/tournaments/:id_t/matches/:id_m', api.fetchTournamentMatch);
    // router.get('/tournaments/players', api.fetchPlayers);
    // router.post('/tournaments/players', api.enrollNewPlayer);
    // router.delete('/tournaments/players', api.excludePlayer);
};