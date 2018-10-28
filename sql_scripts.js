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
    //status = parseInt(status);
    
    var connection = sql_scripts.GetConnection();

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n");
        } else {
            console.log("Error connecting database ... \n");
        }
    });

    var res = false;
	var sql = 'INSERT INTO payments (userID, amount, status, modified) VALUES ("'+userID+'",  '+amount+', 1, NOW())';
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

sql_scripts.LogAmount = function(amount){
    amount = parseFloat(amount);
    
    var connection = sql_scripts.GetConnection();

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n");
        } else {
            console.log("Error connecting database ... \n");
        }
    });

    var res = false;
	var sql = 'INSERT INTO log (amount, modified) VALUES ('+amount+', NOW())';
    connection.query(sql, function(err, rows, fields) {    
        if (err){
            console.log('LogAmount: sql ' + sql + ' error ' + err);
        }
        else{
            res = true;
        }
    });
    
    
    connection.end(function(err){
        return res;
    });
    
}


sql_scripts.GetAmount = function(callback){
    
    var connection = sql_scripts.GetConnection();

    connection.connect(function(err){
        if(!err) {
            console.log("Database is connected ... \n");
        } else {
            console.log("Error connecting database ... \n");
        }
    });

    var res = false;
	var sql = 'SELECT amount FROM log ORDER BY id DESC LIMIT 1';

    connection.query(sql, function(err, rows, fields) {    

		console.log(rows[0]);
	
        if (err){
            console.log('GetAmount: sql ' + sql + ' error ' + err);
        }
        else{
            res = rows[0].amount;
        }
    });
    
    
    connection.end(function(err){
        callback(res);
    });
    
}

module.exports = sql_scripts