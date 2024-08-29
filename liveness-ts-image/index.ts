import {
	RekognitionClient,
	CreateFaceLivenessSessionCommand,
} from "@aws-sdk/client-rekognition";
import type { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuid } from 'uuid';

const rekognitionClient = new RekognitionClient({ region: "us-west-2" });

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const params = {
			ClientRequestToken: uuid(),
		};

		const command = new CreateFaceLivenessSessionCommand(params);
		const response = await rekognitionClient.send(command);

		const sessionId = response.SessionId;

		return {
			statusCode: 200,
			body: JSON.stringify({ sessionId }),
		};
	} catch (error) {
		console.error("Error creating face liveness session:", error);

		return {
			statusCode: 500,
			body: JSON.stringify({
				error: "Failed to create face liveness session",
			}),
		};
	}
};
