const WEB_APP_URL = "https://Sargon_WebApp.azurewebsites.net";

module.exports = async function (context, req) {
  context.log("HttpCallWebApp function triggered");

  try {
    // Built-in fetch is available in Node 18/20/22 on Azure Functions v4+
    const response = await fetch(WEB_APP_URL);
    const text = await response.text();

    context.res = {
      status: 200,
      headers: { "Content-Type": "text/plain" },
      body: `Function called the Web App (${WEB_APP_URL}) and got:\n\n${text}`
    };

  } catch (err) {
    context.log("Error calling web app:", err);

    context.res = {
      status: 500,
      body: "Error calling web app. Check Function logs."
    };
  }
};
