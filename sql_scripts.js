var mysql = require('mysql');
sql_scripts = {};
sql_scripts.GetConnection = function(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '7$L759GbVXlGb',
        database : 'payments'
    });
    return connection;
}


sql_scripts.LogPayment = function(userID, amount, status){
    userID = userID.replace(/'/g, '\\\'');
    amount = parseFloat(amount);
    status = parseInt(status);
    
    var connection = sql_scripts.GetConnection();

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n");
        } else {
            console.log("Error connecting database ... \n");
        }
    });

    var res = false;
	var sql = 'INSERT INTO payments (userID, amount, status, modified) VALUES ("'+userID+'",  '+amount+', '+status+', NOW())';
    connection.query(sql, function(err, rows, fields) {    
        if (err){
            console.log('LogPayment: sql ' + sql + ' error ' + err);
        }
        else{
            res = true;
        }
    });
    
    
    connection.end(function(err){
        return res;
    });
    
}

module.exports = sql_scripts