//let's make a function to handle the actual firing
function newLead(leadid){
    return {

        // Define a fire function
        fire: function fire() {
            console.log("Firing: " + leadid);
            //this is where we will interface with the raspberry pi's GPIO
            //https://npmjs.org/package/pi-gpio
        },
    };
}

// Export this as a module
module.exports = newLead;
