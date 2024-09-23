import { fetchUserAttributes, type FetchUserAttributesOutput } from "aws-amplify/auth";

export async function fetchCurrentAuthenticatedUserAttributes(): Promise<FetchUserAttributesOutput> {
        try {
                const userAttributes = await fetchUserAttributes();
                console.log({ userAttributes });
                return userAttributes;
        } catch (err) {
                console.log(err);
                throw new Error(err instanceof Error ? err.message : String(err));
        }
}
