export const onPressBottomSheet = ({ signOut, showActionSheetWithOptions, isLoggedIn, onPressAccountIndex,  }: {
        signOut: () => void;
        showActionSheetWithOptions: unknown;
        isLoggedIn: boolean;
        onPressBottomSheet?: () => void;
}) => {

        const options = [
                "Votre compte",
                // "Sécurité et accès au compte",
                // "Premium",
                // "Monétisation",
                // "Confidentialité et sécurité",
                // "Notification",
                "Accessibilité, affichage et langues",
                // "Resssources supplémentaires",
                isLoggedIn ? "Déconnexion" : "Connexion",
                "Cancel",
        ];
        const AccountIndex = 0;
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
                                case AccountIndex:
                                        onPressAccountIndex()
                                        break;

                                case LogButtonIndex:
                                        if (isLoggedIn) {
                                                signOut();
                                                return;
                                        }
                                        return;

                                case cancelButtonIndex:
                                // Canceled
                        }
                },
        );
}