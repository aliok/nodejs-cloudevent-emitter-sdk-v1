const v1 = require("cloudevents-sdk/v1");

console.log("Starting");
console.log(process.env);

/*
 * Creating an event
 */
let myevent = v1.event()
    .type("com.github.pull.create")
    .source("urn:event:from:myapi/resourse/123");

// The binding configuration using POST
let config = {
    method: "POST",
    url   : process.env.K_SINK
};

// The binding instance
let binding = new v1.StructuredHTTPEmitter(config);

setInterval(function(){
    console.log("Gonna emit event");
    // Emit the event using Promise
    binding.emit(myevent)
        .then(response => {
            // Treat the response
            console.log(response.data);

        }).catch(err => {
        // Deal with errors
        console.error(err);
    });

}, 1000);


registerGracefulExit();

function registerGracefulExit() {
    let logExit = function () {
        console.log("Exiting");
        process.exit();
    };

    // handle graceful exit
    //do something when app is closing
    process.on('exit', logExit);
    //catches ctrl+c event
    process.on('SIGINT', logExit);
    process.on('SIGTERM', logExit);
    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', logExit);
    process.on('SIGUSR2', logExit);
}
