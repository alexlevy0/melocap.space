/**
 * @fileoverview FeatureCard component for displaying feature information
 * @module FeatureCard
 */

import React from 'react';
import { YStack, H2, Paragraph } from 'tamagui';

/**
 * FeatureCard component props
 */
interface FeatureCardProps {
  title: string;
  description: string;
}

/**
 * FeatureCard component
 * @param {FeatureCardProps} props - The component props
 * @returns {React.ReactElement} The rendered feature card
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <YStack w={300} p="$4" br="$4" boc="$borderColor" bw={1}>
    <H2>{title}</H2>
    <Paragraph>{description}</Paragraph>
  </YStack>
);
