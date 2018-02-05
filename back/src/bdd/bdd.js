const mysql = require('mysql')

let connection // il vaudra peut-être mieux déplacer ça dans le main ?

exports.connect = function() {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'pingdb'
    })
}

exports.init = function(){
    connection.query('CREATE TABLE if not exists people (id int primary key, name varchar(255), age int, address text)', function(err, result) {
        if (err) throw err
        console.log("table people créée")
    }) 
}

exports.getPeoplebyID = function(id){
    connection.query('select * from people where id = '+id, function(err, result){
        if(err) throw err
        console.log(result[0].name)
    })
}