const mysql = require('mysql')
const execsql = require('exec-sql')


let connection;
let directory_name = "../resources/ping_db.sql";

exports.connect = function() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ping_db'
    })
};

exports.init = function(){
    connection.connect(
        function(err) {
            if (err){
                console.log("La connexion a échoué")
                throw err;
            }
        });

    connection.query("SELECT * FROM p_joueurs;",
        function() {
            console.log("Table p_joueurs inaccessible, création de la bdd");
            create();
        });
};

create = function(){
    execsql.connect({
        'database' : 'ping_db',
        'user' : 'root',
        'password' : ''
    });
    execsql.executeFile(directory_name, function(err) {
        if (err) throw err;
        console.log("La bdd existe")
    })

};

exports.getPeoplebyID = function(id){
    connection.query('select * from people where id = '+id, function(err, result){
        if(err) throw err
        console.log(result[0].name)
    })
};