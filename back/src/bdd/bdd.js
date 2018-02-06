const mysql = require('mysql')
const execsql = require('exec-sql')

let connection // il vaudra peut-être mieux déplacer ça dans le main ?
let directory_name = "../resources/ping_db.sql"

exports.connect = function() {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'ping_db'
    })
}

exports.init = function(){
    connection.connect(function(err) {
        // si ça plante, on la recrée. (Il possible que ce soit parfaitement crétin.)

        if (err){
            // connection.query("CREATE DATABASE ping_db", function (err, result) {
            //     if (err) throw err;
            //     console.log("Database created");
            // });
            create()
            console.log("Base de donnée réinitalisée")
        }
    })
    create()
}

create = function(){
    // let dbConfig = {
    //     host: 'localhost',
    //     user: 'root',
    //     password: ''
    // }
    // let sql = 'use ping_db;'
    // let sqlFile = directory_name
    // execsql.config(dbConfig)
    // .exec(sql)
    // .execFile(sqlFile, function(err, results){
    //     console.log(results);
    // }).end();
    execsql.connect({
        'database' : 'ping_db',
        'user' : 'root',
        'password' : ''
    })
    execsql.executeFile(directory_name, function(err) {
        if (err) throw err
        console.log("La bdd existe")
    })

}

exports.getPeoplebyID = function(id){
    connection.query('select * from people where id = '+id, function(err, result){
        if(err) throw err
        console.log(result[0].name)
    })
}