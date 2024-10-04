import { getCurrentUser, type GetCurrentUserOutput } from "aws-amplify/auth";

export async function fetchCurrentAuthenticatedUser(): Promise<GetCurrentUserOutput | null> {
        try {
                const currentUser = await getCurrentUser();
                console.log({ currentUser });
                return currentUser;
        } catch (err) {
                console.log(err);
                return null
        }
}
