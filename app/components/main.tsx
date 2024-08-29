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
                <Text>Tamagui</Text>
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
              
              <Input placeholder="npm create tamagui" w={250} />
              
              <XStack space>
                <Button size="$3" theme="alt1">START</Button>
              </XStack>
            </YStack>

            <YStack space="$6" mt="$10">
              <Feature
                title="CORE"
                description="A style library for React and/or React Native with a large typed superset of the React Native style API, with no outside dependencies in about 24Kb."
              />
              <Feature
                title="STATIC"
                description="A smart optimizer that makes your app fast with partial analysis, extracts CSS, flattens your tree, and removes code. Next, Webpack, Vite, Babel and Metro."
              />
              <Feature
                title="TAMAGUI"
                description="All the components you'd want, cross platform and adaptable to each other. Compound Component APIs, styled or unstyled, sizable, themeable, and more."
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
