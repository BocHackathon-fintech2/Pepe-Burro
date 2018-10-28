var request = require('request');
var sql_scripts = require('./sql_scripts');

//main variables
var main_url = "https://sandbox-apis.bankofcyprus.com/df-boc-org-sb/sb/psd2"
var client_id = "cb1c92c1-f571-476e-ba89-036bcd8a30df"
var client_secret = "X7wI3mI2eD7hE1pG5lT7cD0dL1iF6nU8qV2bM1dK4dX1qQ5mC8"
var tppid = "singpaymentdata"

//variables for authenrisation
var sub_id = "" 
var access_token= ""
var auth_code = "123456"


//shortcut for post function
function post_api(url,data,headers,callback){
    if(!headers) {
        request.post(main_url + url, {
            form: data, 
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }, callback);
    }
    else {
        request.post(main_url + url, {
            json: data,  
            headers: headers
        }, callback);
    }
}

//shortcut for get function
function get_api(url,headers,callback){
    var options = {
        url: main_url+url,
        method: 'GET',
        headers: headers
    }
    request(options,callback)
}

//shortcut for patch_api function
function patch_api(url,data,headers,callback){
    request.patch(main_url+url,
    {
        json:data,
        headers: headers
    }, callback);
}
boc_API = {};

//get toket for the app
boc_API.get_app_token = function(callback){
    var data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "grant_type":"client_credentials",
        "scope":"TPPOAuth2Security"
    }
    post_api("/oauth2/token", data,null,function(error, response, body) {
        if (error) {
            console.log(error)
        } else {
            
            token_response = JSON.parse(body)
            console.log("The token has been got!")
            if(token_response.access_token){
                access_token = token_response.access_token
                boc_API.create_subscription(token_response.access_token,callback)
            }
        }
    })   
}

//create the subscription
boc_API.create_subscription = function(accesstoken,callback){
    var data = {
        "accounts": {
            "transactionHistory": true,
            "balance": true,
            "details": true,
            "checkFundsAvailability": true
        },
        "payments": {
            "limit": 99999999,
            "currency": "EUR",
            "amount": 999999999
        }
    }
    var headers = {
        "Authorization":"Bearer "+accesstoken,
        "Content-Type":"application/json",
        "app_name":"myapp",
        "tppid": tppid,
        "originUserId":"abc",
        "timeStamp":Date.now(),
        "journeyId":"abc"
    }
    var url = `/v1/subscriptions?client_id=${client_id}&client_secret=${client_secret}`;
    post_api(url,data,headers,function(err,response,body){
        subBody = body;
        sub_Id = subBody.subscriptionId;
        console.log("The subscription id has been got");
        sub_id = sub_Id;
        boc_API.get_login_url(sub_Id,callback);
    })
}

//get login url
boc_API.get_login_url = function(subId,callback){
    usrLoginUrl = main_url+"/oauth2/authorize?response_type=code&redirect_uri=http://104.40.194.149:3000/bocOauthcb&scope=UserOAuth2Security&client_id="+client_id+"&subscriptionid="+subId;
    console.log(`Login to BOC with the URL: ${usrLoginUrl}`);
    callback(usrLoginUrl, subId);
}

//get auth code 2
boc_API.get_OAuth_code_2 = function(code, amount, callback){
    var data = {
        "client_id":client_id,
        "client_secret":client_secret,
        "grant_type":"authorization_code",
        "scope":"UserOAuth2Security",
        "code":code
    }
    post_api("/oauth2/token",data,null,function(err,response,body){
        oauthcode2 = JSON.parse(body);
        console.log("The user approval code has been added");
        boc_API.get_sub_id_info(sub_id,oauthcode2.access_token,amount, callback);
    })
}

//get subscription info (check if the subscription available)
boc_API.get_sub_id_info = function(subId,oauthcode2,amount,callback){
    var url = "/v1/subscriptions/"+subId+"?client_id="+client_id+"&client_secret="+client_secret;
    var headers = {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+access_token,
        "originUserId":"abc",
        "tppId":tppid,
        "timestamp":Date.now(),
        "journeyId":"abc"
    }
    get_api(url,headers,function(err,response,body){
        subscription_info = JSON.parse(body);
        console.log(subscription_info);
        boc_API.update_sub_id(subId,oauthcode2,subscription_info[0].selectedAccounts,amount,callback);
    })
    
}

//update subscription id
boc_API.update_sub_id = function(subId,oauthcode2,selectedAccounts,amount,callback){
    console.log("Subscription ID has been updated : "+subId)
    var data = {
        "selectedAccounts": selectedAccounts,
        "accounts": {
            "transactionHistory": true,
            "balance": true,
            "details": true,
            "checkFundsAvailability": true
        },
        "payments": {
            "limit": 8.64181767,
            "currency": "EUR",
            "amount": 93.21948702
        }
    }
    var headers= {
        "Authorization":"Bearer "+oauthcode2,
        "Content-Type":"application/json",
        "app_name":"myapp",
        "tppid":tppid,
        "originUserId":"abc",
        "timeStamp":Date.now(),
        "journeyId":"abc"
    }
    
    var url = `/v1/subscriptions/${subId}?client_id=${client_id}&client_secret=${client_secret}`;
    patch_api(url,data,headers,function(err,response,body){
        // console.log(body)
        if(body.error){
            console.log(body.error.additionalDetails)
        }
        // console.log(amount);
        boc_API.sign_payment('351012345671','351092345672',amount, function (transaction_amount,balance) {
            var user_id = '351012345671'
            sql_scripts.LogPayment(user_id, transaction_amount);
            callback(transaction_amount,balance);
        })
    })
}

//sign payment between two accounts
boc_API.sign_payment = function(acc_id_1, acc_id_2, amount, callback) {
    console.log('Payment Started')
    var url = 'https://sandbox-apis.bankofcyprus.com/df-boc-org-sb/sb/jwssignverifyapi/sign';
    var headers= {
        "Content-Type":"application/json",
        "tppid":tppid
    }

    //body
    var data = {
        "debtor": {
          "accountId": acc_id_1
        },
        "creditor": {
          "accountId": acc_id_2
        },
        "transactionAmount": {
          "amount": amount,
          "currency": "EUR",
          "currencyRate": "string"
        },
        "endToEndId": "string",
        "paymentDetails": "test sandbox ",
        "terminalId": "string",
        "branch": "",
         "executionDate": "",
        "valueDate": ""
    };
    request.post(url,
        {
            json: data,  // your payload data placed here
            headers: headers
        }, 
        function(err,response,body){
            console.log('Sign Request Started');
            //variables
            var payment_info = JSON.parse(JSON.stringify(body));
            var payload = payment_info['payload'];
            var signatures = payment_info['signatures'];
            var signature = signatures[0]['signature'];
            var protected = signatures[0]['protected'];
            console.log('Sign Request Finished');
            boc_API.create_payment(payload,signature,protected, callback);

        });

    
}

//create payment
boc_API.create_payment = function(payload,signature,protected,callback) {
    
    var data = {
        "payload": payload,
        "signatures": [
            {
                "protected": protected,
                "signature": signature
            }
        ]
    }
    var url = '/v1/payments?client_id=' + client_id +'&client_secret=' + client_secret
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + access_token,
        'subscriptionId': sub_id,
        'originUserId': "abc",
        'tppId': tppid,
        'journeyId': 'abc',
        'timeStamp': Date.now(),
        'correlationId': 'xyz',
        'lang': 'en'
    }
    post_api(url,data,headers,function(err,response,body) {
        console.log('Create Payment Started');
        //variables
        var payment_id = body['payment']['paymentId'];
        var transaction_time = body['payment']['transactionTime'];
        var transaction_amount = body['payment']['transactionAmount']['amount'];
        boc_API.approve_payment(payment_id,transaction_time,transaction_amount,callback);
        console.log('Create Payment Finished');
    })
}

//approve payment
boc_API.approve_payment = function(payment_id,transaction_time,transaction_amount,callback) {
    
    var data = {
        "transactionTime": transaction_time,
        "authCode": auth_code
    }
    var url = `/v1/payments/${payment_id}/authorize?client_id=${client_id}&client_secret=${client_secret}`
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + access_token,
        'subscriptionId': sub_id,
        'originUserId': 'abc',
        'tppId': tppid,
        'journeyId': 'abc',
        'timeStamp': Date.now()
    }
    post_api(url,data,headers,function(err,response,body) {
        console.log('Approve Payment Started');
        
        console.log('Approve Payment Finished');
        boc_API.get_balance('351012345671',function(balance) {
            callback(transaction_amount,balance);
        });
        
    })
}

//approve payment
boc_API.get_balance = function(account_num,callback) {
    var url = `/v1/accounts/${account_num}?client_id=${client_id}&client_secret=${client_secret}`
    console.log(sub_id)
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + access_token,
        'subscriptionId': sub_id,
        'originUserId': "50520218",
        'tppId': tppid,
        'journeyId': 'abc',
        'timeStamp': Date.now()
    }
    get_api(url,headers,function(err,response,body) {
        console.log('Get Balance Started');
        var balance = JSON.parse(body);
        balance = balance[0]['balances'][0]['amount'];
        console.log('Get Balance Finished');
        callback(balance); 
    });
}

module.exports = boc_API