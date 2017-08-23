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
    
    //
    // Because I couldn't find a good source for colorpalette ids on colorhunt,
    // the below function generates a random number from 0 - 10000 and sees if it matches
    // a color palette code, and calls the function recursively if it doesn't.
    // 
    // This means its usually making several calls before returning data.
    //
    function getColorJson(url) {
    
    // Loads in colorhunt url via request
    request(url, function(error, response, html){
        
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
            
            // Finds our string of data on the page
            // -- or returns "-1" to itemerIndex if the random code guess doesn't work
            var itemerIndex = script.search("itemer");  
            
            if (itemerIndex === -1) {
                console.log(url + "didn't work.");
                url = Math.floor(Math.random() * 100000).toString();
                getColorJson('http://colorhunt.co/c/' + url);
                return;
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
  
            console.log("The code " + json.id + " worked!");
             res.json(json);
            return;
        } else {
            console.log("Error on request: ")
            console.log(error);
        }
  
    })
    }
  
    // Generates first color code and initializes recursive function.
    var url = Math.floor(Math.random() * 100000).toString();
    getColorJson('http://colorhunt.co/c/' + url);
    

});



app.listen(3000, function () {
  console.log('Data returned to localhost, on port 3000!')
});
    