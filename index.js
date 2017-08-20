const express = require('express');
// var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function (req, res) {
  var colors = {
      c1: "#ffffff",
      c2: "#ababab",
      c3: "#777777",
      c4: "#111111"
  }
  
    var url = 'http://colorhunt.co/c/95352';

    request(url, function(error, response, html){

        if(!error){

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var title, release, rating;
            var json = { id : "hm", 
                        code : "", 
                        date : "", 
                        likes: ""
                       };
                        
            var script = $('#jscode').next().html();
            
            var itemerIndex = script.search("itemer");
            
            var itemerString = script.substr(itemerIndex, itemerIndex + 100);
            
            var itemer = itemerString.split("'");
            console.log(itemer);
            
            json.id = itemer[1];
            json.fullcode = itemer[3];
            json.date = itemer[5];
            json.likes = itemer[7];
  
        res.json(json)
        }
  
    })
    
});

app.listen(3000, function () {
  console.log('Data returned to your host, on port 3000!')
});
    