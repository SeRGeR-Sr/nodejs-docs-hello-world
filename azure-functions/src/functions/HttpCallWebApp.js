import { app } from '@azure/functions';
import fetch from "node-fetch";

app.http('HttpCallWebApp', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const webAppUrl = "https://Sargon_WebApp.azurewebsites.net";

        try {
            const response = await fetch(`${webAppUrl}/`);
            const text = await response.text();

            return {
                status: 200,
                jsonBody: {
                    message: "Function successfully called the Web App",
                    webAppResponse: text
                }
            };
        } catch (error) {
            context.log("Error calling web app:", error);
            return {
                status: 500,
                body: "Error calling web app"
            };
        }
    }
});
