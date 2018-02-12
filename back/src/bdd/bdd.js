/**
 * @file Fichier définissant les fonctions de connexion et de création de la base de données
 */

const mysql = require('mysql');
const execsql = require('exec-sql');
const winston = require('winston');

/**
 * Objet qui contiendra les informations de connexion
 */
let connection;
//TODO : A bouger ?
let directory_name = "../resources/ping_db.sql";

/**
 * Charge les informations de connexion dans l'objet connection
 */
exports.connect = function() {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ping_db'
    });
};

/**
 * Se connecte à la bdd et créé les tables si nécessaire
 * @throws {ECONNREFUSED} Connexion à la base de données impossible
 */
exports.init = function(){
    connection.connect(
        function(err) {
            if (err){
                winston.log('error', 'La connexion a échoué', err);
                throw err;
            }
        });

    connection.query("SELECT * FROM p_joueurs;",
        function() {
            winston.log('info', 'Table p_joueurs inaccessible, création de la bdd');
            create();
        });
};

/**
 * Execute le fichier de création des tables
 * @throws Le fichier de création sql est illisible
 */
create = function(){
    execsql.connect({
        'database' : 'ping_db',
        'user' : 'root',
        'password' : ''
    });

    execsql.executeFile(directory_name, function(err) {
        if (err) {
            winston.log('error', 'Fichier sql non exécutable');
            throw err;
        }
        winston.log('info', 'Tables créées');
    })

};

exports.getPeoplebyID = function(id){
    connection.query('select * from people where id = '+id, function(err, result){
        if(err) throw err
        console.log(result[0].name)
    })
};