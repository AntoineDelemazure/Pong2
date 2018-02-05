/*  
    Ceci est un bon exemple de test unitaire avec mocha
*/
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

describe('Fonctionnalités de bases', function(){
    it('devrait nous assurer qu\'on accède bien à aap.js', function(done){
        if(ultimate_truth()){
            done();
        }else{
            done(new Error("Manifestement je n'accède pas au fichier"))
        }
    })
})