import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { Spacing, BorderRadius, FontSize, Shadow } from '../constants/theme';
import { useTheme } from '../context/theme';

interface Props {
    name: string;
    icon: string;
    questionCount: number;
    onPress: () => void;
    index: number;
}

export default function SubjectCard({ name, icon, questionCount, onPress, index }: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.85)).current;
    const { colors } = useTheme();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay: index * 80, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, delay: index * 80, useNativeDriver: true }),
        ]).start();
    }, []);

    return (
        <Animated.View style={[styles.wrapper, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <TouchableOpacity style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={onPress} activeOpacity={0.8}>
                <Text style={styles.icon}>{icon}</Text>
                <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>{name}</Text>
                <Text style={[styles.count, { color: colors.textSecondary }]}>{questionCount} Questions</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: { width: '48%', marginBottom: Spacing.md },
    card: {
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        alignItems: 'center',
        borderWidth: 1,
        ...Shadow.sm,
    },
    icon: { fontSize: 36, marginBottom: Spacing.sm },
    name: { fontSize: FontSize.md, fontWeight: '700', textAlign: 'center', marginBottom: Spacing.xs },
    count: { fontSize: FontSize.xs },
});
