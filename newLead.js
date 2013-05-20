var gpio = require("pi-gpio");

//let's make a function to handle the actual firing
function newLead(leadid){
    return {

        // Define a fire function
        fire: function fire() {
            console.log("Firing: " + leadid);
            //this is where we will interface with the raspberry pi's GPIO
            //https://npmjs.org/package/pi-gpio
			gpio.open(leadid, "output", function(err) {        
			    gpio.write(leadid, 1, function() {            
			        gpio.close(leadid);                        
			    });
			});
        },

		reset: function reset() {
			console.log("Reseting: " + leadid);
			//turning off this lead
			gpio.open(leadid, "output", function(err) {
				gpio.write(leadid, 0, function() {
					gpio.close(leadid);
				});
			});
		},
    };
}

// Export this as a module
module.exports = newLead;
