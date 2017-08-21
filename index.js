// Written by Ben Holland

const express = require('express');
// var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var cors = require('cors');


app.use(cors());

//app.addHeader("Access-Control-Allow-Origin", "*");

app.get('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    
    function getColorJson(url) {
    request(url, function(error, response, html){
        
        console.log(response.statusCode);

        if(!error){

            // Parses html via cheerioJS
            
            var $ = cheerio.load(html);

            var json = { id : "", 
                        code : "", 
                        date : "", 
                        likes: "",
                        c1: "",
                        c2: "",
                        c3: "",
                        c4: ""
                       };
                        
            var script = $('#jscode').next().html();
            
            var itemerIndex = script.search("itemer");
            
            if (itemerIndex === -1) {
                console.log(url + "didn't work.");
                
                return false;
                //return getColorJson(Math.floor(Math.random() * 100000))
            }
            
            var itemerString = script.substr(itemerIndex, itemerIndex + 100);
            
            var itemer = itemerString.split("'");
            //console.log(itemer);
            
            json.id = itemer[1];
            json.code = itemer[3];
            json.date = itemer[5];
            json.likes = itemer[7];
            json.c1 = "#" + json.code.substring(0,6); 
            json.c2 = "#" + json.code.substring(6,12); 
            json.c3 = "#" + json.code.substring(12,18); 
            json.c4 = "#" + json.code.substring(18,24);
  
            console.log("In return: " + json);
             res.json(json);
            return true;
        }
  
    })
    }
  
    // Loads in colorhunt url via request
        
    var id = Math.floor(Math.random() * 100000);
    
    var url = 'http://colorhunt.co/c/' + id.toString();
    
//    var json = getColorJson(url);
    
    while (getColorJson('http://colorhunt.co/c/' + Math.floor(Math.random() * 100000).toString())) {
        
    }
    
//    console.log("trying url : " + url);
//    
//    console.log("Outside:")
//    console.log(json);
    
    
    
    

});



app.listen(3000, function () {
  console.log('Data returned to your host, on port 3000!')
});
    