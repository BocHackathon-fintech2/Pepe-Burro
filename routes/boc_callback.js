var router = require('express').Router();
var boc_API = require('../boc_api');
var sql_scripts = require('../sql_scripts');

router.get('/', function(req, res) {
    if(req.query.code){
        // console.log(req);
        sql_scripts.GetAmount(function(amo) {
            console.log('amount come after auth - ' + amo);
            boc_API.get_OAuth_code_2(req.query.code,amo, function (amount, balance) {
                res.redirect(`http://104.40.194.149/ok.php?amount=${amount}&balance=${balance}`);
            })
        });
        
        
    }
});

module.exports = router;