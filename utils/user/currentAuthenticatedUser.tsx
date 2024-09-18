import { getCurrentUser } from "aws-amplify/auth";

export async function currentAuthenticatedUser() {
        try {
                // @ts-expect-error loginId exist only in signInDetails
                const { username, userId, signInDetails: { loginId } } = await getCurrentUser();
                return { username, userId, loginId };
        } catch (err) {
                console.log(err);
        }
}
