import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

import { sayHello } from "../functions/say-hello/resource"

const schema = a.schema({
	sayHello: a
		.query()
		.arguments({
	  		name: a.string(),
		})
		.returns(a.string())
		.handler(a.handler.function(sayHello))
		.authorization(allow => [allow.authenticated()]),

	// Todo: a
	// .model({
	// 	content: a.string(),
	// 	isDone: a.boolean()
	// })
	// .authorization(allow => [allow.owner()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: 'userPool'
	}
});