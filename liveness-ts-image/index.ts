import { RekognitionClient, CreateFaceLivenessSessionCommand } from "@aws-sdk/client-rekognition";
import type { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuid } from 'uuid';

const rekognitionClient = new RekognitionClient({ region: "us-west-2" });

export const handler: APIGatewayProxyHandler = async (event) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
    };

    if (event.httpMethod === 'OPTIONS') {
        // Handle CORS preflight request
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({}),
        };
    }

    try {
        const params = {
            ClientRequestToken: uuid(),
        };

        const command = new CreateFaceLivenessSessionCommand(params);
        const response = await rekognitionClient.send(command);

        const sessionId = response.SessionId;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ sessionId }),
        };
    } catch (error) {
        console.error("Error creating face liveness session:", error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: "Failed to create face liveness session",
            }),
        };
    }
};