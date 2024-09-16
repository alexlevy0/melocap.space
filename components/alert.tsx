import { Alert, Platform } from 'react-native'

const alertPolyfill = (
        title: string,
        description: string,
        options: Array<{ style?: string; onPress?: () => void }>,
        extra: unknown
) => {
        const result = window.confirm([title, description].filter(Boolean).join('\n'))

        if (result) {
                const confirmOption = options.find(({ style }) => style !== 'cancel')
                confirmOption?.onPress?.()
        } else {
                const cancelOption = options.find(({ style }) => style === 'cancel')
                cancelOption?.onPress?.()
        }
}
export const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert
