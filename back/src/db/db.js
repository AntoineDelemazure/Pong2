/**
 * @file Fichier définissant les fonctions de connexion et de création de la base de données
 */

const mysql = require('mysql');
const execsql = require('exec-sql');
const winston = require('winston');

/**
 * Objet qui contiendra les informations de connexion
 */
//let connection;
//TODO : A bouger ?
let directory_name = "../resources/ping_db.sql";

/** 
 * Singleton d'instance de connexion
*/
let Connection = (function(){
    let instance;

    function createInstance(){
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ping_db'
        });
        return connection;
    }
    return{
        getInstance: function(){
            if(!instance){
                instance = createInstance();
            }
            return instance;
        }
    };
})();
exports.Connection = Connection;

/**
 * Se connecte à la bdd et créé les tables si nécessaire
 * @throws {ECONNREFUSED} Connexion à la base de données impossible
 */
exports.init = function(){
    Connection.getInstance().connect(
        function(err) {
            if (err){
                winston.log('error', 'La connexion a échoué', err);
                throw err;
            }
        });

    Connection.getInstance().query("SELECT * FROM p_joueurs;",
        function(err) {
            if(err){
                winston.log('info', 'Table p_joueurs inaccessible, création de la bdd');
                create();
            }
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