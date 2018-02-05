var mysql      = require('mysql');

//Ceci est un bon exemple de test unitaire avec mocha

// This is just for organisation and reporting
describe('Our application', function() {

    // This is the name of the test
    it('should understand basic mathematical principles', function(done) {
  
      // We want this test to pass.
      if (5 == 5) {
        // If the behavior is as expected, call done with no argument.
        done();
      } else {
        // Otherwise, call done with an error.
        done(new Error("Not sure what's happened."));
      }
  
    });
});

describe("Test de la bdd", function(){

    let connection

    before(function(done){
        connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'loluser',
            password : 'secret'
        });
        done();
    })

    it('devrait se connecter à la bdd', function(done){
        let result
        connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
            if (err) throw err
            result  = rows[0].solution
        })
        console.log("lol "+result)
        if(result == 2){
            done()
        }else{
            done(new Error("On a du mal à acceder à la bdd" + result))
        }
    })// fin test

    after(function(done){
        connection.end()
        done()
    })
})// fin describe