import React from 'react';
import { ScrollView } from 'react-native';
import { TamaguiProvider, Theme, YStack, XStack, H1, H2, Text, Button, Input } from 'tamagui';
import { config } from '@tamagui/config/v2';
import { BlurView } from 'expo-blur';

export const Main = () => {
  return (
    <TamaguiProvider config={config}>
      <Theme name="light">
        <ScrollView>
          <YStack f={1} jc="flex-start" ai="center" space>
            <BlurView intensity={10} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60 }}>
              <XStack jc="space-between" ai="center" px="$4" py="$2">
                <Text>À vos paris, vibrez, jouez !</Text>
                <XStack space>
                  <Text>DOCS</Text>
                  <Text>UI</Text>
                  <Text>THEME</Text>
                </XStack>
              </XStack>
            </BlurView>

            <YStack mt="$10" ai="center" space="$4">
              <H1 ta="center" fow="800">Write less</H1>
              <H1 ta="center" fow="800" col="$orange10">runs faster</H1>
              <Text ta="center">STYLES · OPTIMIZING COMPILER · UI KIT</Text>
              <Text ta="center">FOR REACT · EVERY PLATFORM</Text>
              
              <Input placeholder="À vos paris, vibrez, jouez !" w={250} />
              
              <XStack space>
                <Button size="$3" theme="alt1">START</Button>
              </XStack>
            </YStack>

            <YStack space="$6" mt="$10">
              <Feature
                title="Pariez"
                description="Découvrez chaque jour un nouveau thème musical et misez sur les morceaux qui capturent le mieux son essence. Entrez dans le jeu et mettez vos connaissances musicales à l'épreuve !"
              />
              <Feature
                title="Misez"
                description="Sélectionnez vos morceaux et soumettez votre playlist pour participer au défi du jour. La diversité et l'originalité de vos choix pourraient bien faire la différence !"
              />
              <Feature
                title="Dansez"
                description="Suivez votre progression dans le classement et rivalisez avec les autres participants pour décrocher la première place. Gagnez des récompenses virtuelles en démontrant votre expertise musicale !"
              />
            </YStack>
          </YStack>
        </ScrollView>
      </Theme>
    </TamaguiProvider>
  );
};

const Feature = ({ title, description }) => (
  <YStack space="$2" maw={300}>
    <H2>{title}</H2>
    <Text>{description}</Text>
  </YStack>
);
