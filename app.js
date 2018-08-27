/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START app]
var request = require('request');
var express = require('express');
var cheerio = require('cheerio');
var util = require('util');
var url = require('url-parse');
var app = express();

app.use(express.static('static'));

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
})

app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
})

app.get('/process_get', function (req, res) {
  // Prepare output in JSON format
  var response = {
    url: req.query.url,
    //linkurl : req.query.linkurl,
    //scripturl : req.query.scripturl,
  };
  // hitting url
  request(req.query.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body) // Print the google web page.
      var $ = cheerio.load(response.body);

      function newUrl(actualurl,replaceurl){
      var parsed = url(actualurl);
      var newurl = parsed.set('hostname',replaceurl);
      return newurl.href;
    }

      function replacement(target,attribute,replaceurl){
      $(target).each(function(index,value){
        var linkw = $(value).attr(attribute);
        var data = newUrl(linkw,replaceurl);
        $(this).attr(attribute,data);
        //console.log(util.inspect(value,false,1));
      });
    }

    

    replacement('link','href',req.query.linkurl);
    replacement('script','href',req.query.scripturl);
    replacement('script','src',req.query.scripturl);
      res.setHeader('content-type', 'text/html');
      res.end($.html());


  /*$('link').each(function(index,value){
        var linkw = $(value).attr('href');
        var parsed = url(linkw);
        var newurl= parsed.set('hostname',req.query.linkurl);
        $(this).attr('href',newurl.href);
        //console.log(util.inspect(value,false,1));
      });
 $('script').each(function(index,value){
        var linkw = $(value).attr('src');
        var parsed = url(linkw);
        var newurl= parsed.set('hostname',req.query.scripturl);
        $(this).attr('href',newurl.href);
        $(this).attr('src',newurl.href);
        //console.log(util.inspect(value,false,1));
      });*/

    
      //res.send(response.body);
    }
  })
})

app.get('/robots.txt', (req, res) => {
  res.status(200).send('User-agent: *\nDisallow: /').end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

// [END app]
