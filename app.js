﻿var http = require("http");
var path = require("path");
var querystring = require('querystring');
var process = require('child_process');
var moment = require("moment");
var express = require("express");
var app = express();


app.get("/", (request, response) => {
	// allow all
	response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    response.header('Access-Control-Allow-Headers', 'Content-Type');

	var time = moment().format("YYYY-MM-DD HH:mm:ss");
	if(request.params.cmd == 'deploy-app') {
		process.exec('ls -l',
		 function (error, stdout, stderr) {
			if (error !== null) {
			  console.log('exec error: ' + error);
			}
			response.send(JSON.stringify({code : 200, time : time, output : stdout}));
		});
	}
});

// init server
http.createServer(app).listen(10081, () => {
	console.log("Server started on port", 10081);
});