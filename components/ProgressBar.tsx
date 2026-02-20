import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BorderRadius } from '../constants/theme';
import { useTheme } from '../context/theme';

interface Props {
    progress: number; // 0 to 1
    color?: string;
    height?: number;
}

export default function ProgressBar({ progress, color, height = 6 }: Props) {
    const { colors } = useTheme();
    const fillColor = color || colors.primary;

    return (
        <View style={[styles.track, { height, backgroundColor: colors.surfaceLight }]}>
            <View style={[styles.fill, { width: `${Math.min(progress * 100, 100)}%`, backgroundColor: fillColor, height }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        width: '100%',
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: BorderRadius.full,
    },
});
