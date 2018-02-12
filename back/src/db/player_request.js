const db = require('./db.js')

exports.getPlayerByID = function(id){
    db.Connection.getInstance().query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
      });
      
}