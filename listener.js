var async = require("async"),
http = require('http'),
url = require('url'),
newLead = require("./newLead.js");

var server = http.createServer();

var idmap = {};
idmap['1'] = 18;
idmap['2'] = 18;
idmap['3'] = 18;
idmap['4'] = 18;
idmap['5'] = 18;
idmap['6'] = 18;
idmap['7'] = 18;
idmap['8'] = 18;

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
			console.log(idmap[lead]);
			var l = newLead(idmap[lead]);
			//these next two functions need to be run with async in series
			async.series([
				function(cb){
					l.fire();
					cb(null);
				},
				function(cb){
					//leave it on for 1 second to trigger the transistor, then turn off
					setTimeout(function(){cb(null); }, 1000);
				},
				function(cb){
					l.reset();
					cb(null);
				}
			],
			function(err, results){
				console.log("finished now");
			});
		}
	}

	res.end(JSON.stringify(ret, 2, 2));
});

server.listen(1337);
