import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Defines and configures the authentication resource.
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
	/**
	 * Custom attributes for the user.
	 */
	userAttributes: {
		/**
		 * Custom display name of the player.
		 * 
		 * - **dataType**: Data type of the attribute (String).
		 * - **mutable**: Indicates if the attribute can be modified after creation.
		 * - **maxLen**: Maximum allowed length for this field.
		 * - **minLen**: Minimum allowed length for this field.
		 */
		"custom:display_name": {
			dataType: "String",
			mutable: true,
			maxLen: 256, // Adjust as needed
			minLen: 0,
		},
		/**
	 		* Consolidated player data containing the latest reward and game played.
	 		* 
	 		* Expected JSON format:
	 		* ```json
	 		* {
	 		*   "reward": {
	 		*     "playedDateTime": "2022-01-01T00:00:00.000Z",
	 		*     "gameId": "gameId1",
	 		*     "trackUri": "uri1",
	 		*     "won": true
	 		*   },
	 		*   "gamePlayed": {
	 		*     "playedDateTime": "2022-01-02T00:00:00.000Z",
	 		*     "gameId": "gameId2",
	 		*     "trackUri": "uri2",
	 		*     "won": false
	 		*   }
	 		* }
	 		* ```
	 		* 
	 		* - **reward**: Object containing the latest reward details.
	 		*   - **playedDateTime**: Date and time when the game was played in ISO 8601 format.
	 		*   - **gameId**: Unique identifier of the game played.
	 		*   - **trackUri**: URI of the track or resource associated with the game.
	 		*   - **won**: Indicator if the player won the game (boolean).
	 		*
	 		* - **gamePlayed**: Object containing the latest game played details.
	 		*   - **playedDateTime**: Date and time when the game was played in ISO 8601 format.
	 		*   - **gameId**: Unique identifier of the game played.
	 		*   - **trackUri**: URI of the track or resource associated with the game.
	 		*   - **won**: Indicator if the player won the game (boolean).
	 		* 
	 		* **Note**: Stored as a JSON string.
	 		*/
		// ...Object.fromEntries(
		// 	[...Array(15)].flatMap((_, i) => [
		// 		[`custom:reward${i + 1}`, {
		// 			dataType: "String",
		// 			mutable: true,
		// 			maxLen: 2048,
		// 			minLen: 0,
		// 		}],
		// 		[`custom:gamePlayed${i + 1}`, {
		// 			dataType: "String",
		// 			mutable: true,
		// 			maxLen: 2048,
		// 			minLen: 0,
		// 		}],
		// 	])
		// ),
	},

	/**
	 * Authentication methods allowed for login.
	 */
	loginWith: {
		email: true, // Allows authentication via email address.
	},
});