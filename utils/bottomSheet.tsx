export const onPressBottomSheet = ({ signOut, showActionSheetWithOptions, isLoggedIn, authStatus }: {
    signOut: () => void;
    showActionSheetWithOptions: unknown;
    isLoggedIn: boolean;
    authStatus: string;
}) => {

        const options = [
                "Votre compte",
                "Sécurité et accès au compte",
                "Premium",
                "Monétisation",
                "Confidentialité et sécurité",
                "Notification",
                "Accessibilité, affichage et langues",
                "Resssources supplémentaires",
                isLoggedIn ? "Déconnexion" : "Connexion",
                "Cancel",
        ];
        const LogButtonIndex = options.length - 2;
        const cancelButtonIndex = options.length - 1;

        showActionSheetWithOptions(
                {
                        title: "Paramètres",
                        message: "Trouves tous les paramètres de votre compte ici",
                        options,
                        cancelButtonIndex,
                        destructiveButtonIndex: LogButtonIndex,
                },
                (selectedIndex: number | undefined) => {
                        switch (selectedIndex) {
                                case 1:
                                        // Save
                                        break;

                                // TODO Add more options

                                case LogButtonIndex:
                                        if (isLoggedIn) {
                                                signOut();
                                                return;
                                        }
                                        // TODO Redirect to auth
                                        // signIn();
                                        return;

                                case cancelButtonIndex:
                                // Canceled
                        }
                },
        );
}