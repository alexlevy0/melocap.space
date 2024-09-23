import { getCurrentUser, type GetCurrentUserOutput } from "aws-amplify/auth";

export async function fetchCurrentAuthenticatedUser(): Promise<GetCurrentUserOutput> {
        try {
                const currentUser = await getCurrentUser();
                console.log({ currentUser });
                return currentUser;
        } catch (err) {
                console.log(err);
                throw new Error(err instanceof Error ? err.message : String(err));
        }
}
