const { app } = require("@azure/functions");

app.timer("TimeLog", {
    schedule: "0 */5 * * * *",   // every 5 minutes
    handler: async (timer, context) => {
        const timestamp = new Date().toISOString();

        if (timer.isPastDue) {
            context.log("Timer function is running late!");
        }

        context.log(`TimeLog executed at ${timestamp}`);
    }
});
