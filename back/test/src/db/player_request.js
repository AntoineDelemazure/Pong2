/**
 * test relatif à la table des joueur
 */

describe("Test de la table p_joueurs", function () {
    let connection
    let player = {"joueur":{
        "joueur_nom"      : "Abitbol",
        "joueur_prenom"   : "Georges",
        "joueur_rang"     : "1",
        "joueur_mail"     : "laclasse@incarne.com",
        "joueur_username" : "LHommeLePlusClasseDuMonde",
        "joueur_password" : "1234",
        "joueur_admin"    : "1",
    }}

    before(function (done) {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ping_db'
        })

    })
})