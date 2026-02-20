import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, BorderRadius } from '../constants/theme';

interface Props {
    progress: number; // 0 to 1
    color?: string;
    height?: number;
}

export default function ProgressBar({ progress, color = Colors.primary, height = 6 }: Props) {
    return (
        <View style={[styles.track, { height }]}>
            <View style={[styles.fill, { width: `${Math.min(progress * 100, 100)}%`, backgroundColor: color, height }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    track: {
        width: '100%',
        backgroundColor: Colors.surfaceLight,
        borderRadius: BorderRadius.full,
        overflow: 'hidden',
    },
    fill: {
        borderRadius: BorderRadius.full,
    },
});
