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
var app = express();

app.use(express.static('public'));

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
})

app.get('/process_get', function (req, res) {
  // Prepare output in JSON format
  var response = {
    url: req.query.url,
  };
  // hitting url
  request(req.query.url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the google web page.
      res.setHeader('content-type', 'text/html');
      res.end(response.body);
    }
  })
  console.log(response);
  //res.end(JSON.stringify(response));
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
