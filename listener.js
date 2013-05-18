var async = require("async"),
_ = require("underscore"),
http = require('http'),
url = require('url'),
gpio = require("pi-gpio"),
newLead = require("./newLead.js");

var server = http.createServer();

server.on('request', function(req, res) {

	var urlobj = url.parse(req.url);
	
	res.setHeader('Content-Type', 'application/json');

	var ret = {};
	ret['status'] = false;

    //get the keyword, ie search term
    if ( ( urlobj.query === null ) || ( urlobj.query === undefined ) ){
        res.statusCode = 200;
        ret['message'] = 'Missing lead identifier';
    } else {
		query = urlobj.query;
		//let's get the lead
		var lead = 0;
		//parse it out if there is more than one parameter
		if ( query.indexOf("&") != -1 ){
			var terms = query.split("&");
			for(var t in terms){
				var term = terms[t];
				if ( term.indexOf("lead") != -1 ){
					var splt = term.split("=");
					lead = splt[1];
				}
			}
		//it's the only parameter
		} else {
			var splt = query.split("=");
			lead = splt[1];
		}
		if ( lead.length == 0 ){
			ret['message'] = 'Missing lead identifier';
		} else {
			ret['status'] = true;
			ret['message'] = 'Firing lead ' + lead;
			//FIRE!
			lead = parseInt(lead);
			console.log(lead);
			var l = newLead(lead);
			l.fire();
		}
	}

	res.end(JSON.stringify(ret, 2, 2));
});

server.listen(1337);
