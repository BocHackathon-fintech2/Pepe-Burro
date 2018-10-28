var router = require('express').Router();
var boc_API = require('../boc_api');

router.get('/', function(req, res) {
    if(req.query.code){
        // console.log(req);
        var sess = req.session;
        console.log(req.session.amount)
        boc_API.get_OAuth_code_2(req.query.code,100, function (amount, balance) {
            res.redirect(`http://104.40.194.149/ok.php?amount=${amount}&balance=${balance}`);
        })
        
        
    }
});

module.exports = router;