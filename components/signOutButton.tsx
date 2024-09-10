import { useAuthenticator } from "@aws-amplify/ui-react-native"
import { Button } from "tamagui"

export const SignOutButton = () => {
	// const { signOut } = useAuthenticator()

	// return <Button onPress={signOut}>sign out</Button>
	return <Button onPress={() => console.log("sign out")}>sign out</Button>
}
