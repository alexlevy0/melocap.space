import { getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";
import { handleUpdateUserAttribute } from "./updateUserAttribute";

export async function currentAuthenticatedUser() {
        try {
                const currentUser = await getCurrentUser();
                const userAttributes = await fetchUserAttributes();
                console.log({ currentUser, userAttributes });
                // TODO Move this call updateUserAttribute, for example
                handleUpdateUserAttribute('custom:reward', "0")
                return currentUser;
        } catch (err) {
                console.log(err);
        }
}
