/**
 * test relatif à la table des joueur
 */

const request = require('../../../src/db/player_request')
const mysql = require('mysql');


describe("Test de la table p_joueurs", function () {
    let connection
    let player
    let player2

    before(function (done) {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ping_db'
        })
        player = {
            name      : "Abitbol",
            firstname   : "Georges",
            rank     : 1,
            email     : "laclasse@incarne.com",
            username : "LHommeLePlusClasseDuMonde",
            password : 1234,
            admin    : 1
        }//end player
        done();
    })//end before

    it("should create a new player in db", function(done){
        request.createPlayer(player, function(row){
            if(row.constructor.name == "OkPacket")
                done();
            else
                done(new Error("La requête semble avoir échoué"));
        })
    })

    it("should have the right name", function(done){
        request.getPlayerByUsername(player.username, function(row){
            if(row[0].name != player.name){
                console.log(row.name + "!=" + player.name)
                done(new Error("Les données sont manifestement erronées"))
            }
            else
                done();
        })
    })

    it("should have the right firstname", function(done){
        request.getPlayerByUsername(player.username, function(row){
            if(row[0].firstname != player.firstname){
                console.log(row.firstname + "!=" + player.firstname)
                done(new Error("Les données sont manifestement erronées"))
            }
            else
                done();
        })
    })

    it("should have the right rang", function(done){
        request.getPlayerByUsername(player.username, function(row){
            if(row[0].rank != player.rank){
                console.log(row.rank + "!=" + player.rank)
                done(new Error("Les données sont manifestement erronées"))
            }
            else
                done();
        })
    })

    it("should have the right mail", function(done){
        request.getPlayerByUsername(player.username, function(row){
            if(row[0].email != player.email){
                console.log(row.email + "!=" + player.email)
                done(new Error("Les données sont manifestement erronées"))
            }
            else
                done();
        })
    })

    it("should have the right password", function(done){
        request.getPlayerByUsername(player.username, function(row){
            if(row[0].password != player.password){
                console.log(row.password + "!=" + player.password)
                done(new Error("Les données sont manifestement erronées"))
            }
            else
                done();
        })
    })

    it("should have the right admin state", function(done){
        request.getPlayerByUsername(player.username, function(row){
            if(row[0].admin != player.admin){
                console.log(row.admin + "!=" + player.admin)
                done(new Error("Les données sont manifestement erronées"))
            }
            else
                done();
        })
    })
/**
 * Les deux fonctions ci-dessous devaient tester le update, mais il ne sert pas
 */
/*
    it("should be updatable", function(done){
        let player2 = {
            name      : "Abitbol",
            firstname   : "Georges",
            rank     : 1,
            email     : "classe@classe.class",
            username : "LHommeLePlusClasseDuMonde",
            password : 1234,
            admin    : 1
        }//end player
        request.updatePlayer(player2, function(row){
            if(row.constructor.name == "OkPacket")
                done();
            else
                done(new Error("La requête semble avoir échoué"));
        })
    })

    it("should have acknoledged the change", function(done){
        request.getPlayerByUsername(player2.username, function(row){
            if(row[0].email != player2.email){
                console.log(row.email + "!=" + player2.email)
                done(new Error("Les données sont manifestement erronées"))
            }
            else
                done();
        })
    })
*/
    after(function (done){
        request.deletePlayer(player.username, function(rows){
            console.log("pouët !!")
            if(rows.constructor.name == "OkPacket")
                done();
            else
                done(new Error("La suppression vient d'échouer"));
        })
    })
})