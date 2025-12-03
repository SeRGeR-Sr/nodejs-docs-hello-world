module.exports = async function (context, myTimer) {
  const timestamp = new Date().toISOString();

  if (myTimer.isPastDue) {
    context.log("TimerLog: function is running late!");
  }

  context.log(`TimerLog: function ran at ${timestamp}`);
};
