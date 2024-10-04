import { fetchUserAttributes, type FetchUserAttributesOutput } from "aws-amplify/auth";

export async function fetchCurrentAuthenticatedUserAttributes(): Promise<FetchUserAttributesOutput | null> {
        try {
                const userAttributes = await fetchUserAttributes();
                console.log({ userAttributes });
                return userAttributes;
        } catch (err) {
                console.log(err);
                return null
        }
}
