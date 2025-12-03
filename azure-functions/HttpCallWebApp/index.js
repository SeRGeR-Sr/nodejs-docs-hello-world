const https = require("https");
const url = require("url");

const WEB_APP_URL = "https://Sargon-WebApp.azurewebsites.net/";

function getUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    const options = url.parse(targetUrl);
    options.method = "GET";

    const req = https.request(options, res => {
      let data = "";

      res.on("data", chunk => {
        data += chunk;
      });

      res.on("end", () => {
        resolve({ statusCode: res.statusCode, body: data });
      });
    });

    req.on("error", err => {
      reject(err);
    });

    req.end();
  });
}

module.exports = async function (context, req) {
  context.log("HttpCallWebApp function triggered");

  try {
    const result = await getUrl(WEB_APP_URL);

    context.log(
      `HttpCallWebApp: got status ${result.statusCode} from ${WEB_APP_URL}`
    );

    context.res = {
      status: 200,
      headers: { "Content-Type": "text/plain" },
      body:
        `Web App responded with status ${result.statusCode}.\n\n` +
        `Body:\n${result.body}`
    };
  } catch (err) {
    context.log("Error calling web app:", err);

    context.res = {
      status: 500,
      body: "Error calling web app. Check HttpCallWebApp logs for details."
    };
  }
};
