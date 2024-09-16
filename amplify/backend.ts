import { defineBackend } from "@aws-amplify/backend";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";

import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { sayHello } from './functions/say-hello/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
	auth,
	data,
	sayHello,
})

const livenessStack = backend.createStack("liveness-stack")

const livenessPolicy = new Policy(livenessStack, "LivenessPolicy", {
	statements: [
		new PolicyStatement({
			actions: ["rekognition:StartFaceLivenessSession"],
			resources: ["*"],
		}),
	],
})
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(livenessPolicy) // allows guest user access
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(livenessPolicy) // allows logged in user access

const { cfnIdentityPool } = backend.auth.resources.cfnResources;
cfnIdentityPool.allowUnauthenticatedIdentities = false;