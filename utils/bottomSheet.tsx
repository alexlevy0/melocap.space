export const onPressBottomSheet = ({ signOut, showActionSheetWithOptions, isLoggedIn, onPressAccountIndex, }: {
        signOut: () => void;
        showActionSheetWithOptions: (options: {
                title?: string;
                message?: string;
                options: string[];
                cancelButtonIndex?: number;
                destructiveButtonIndex?: number;
        }, callback: (selectedIndex?: number) => void) => void;
        isLoggedIn: boolean;
        onPressAccountIndex?: () => void;
}) => {

        const options = [
                "Votre compte",
                isLoggedIn ? "Déconnexion" : "Connexion",
                "Cancel",
        ];
        const AccountIndex = 0;
        const LogButtonIndex = 1;
        const cancelButtonIndex = 2;

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
                                        onPressAccountIndex?.()
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