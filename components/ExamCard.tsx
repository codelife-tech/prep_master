import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { Spacing, BorderRadius, FontSize, Shadow, DarkColors, LightColors } from '../constants/theme';
import { ExamType } from '../types';
import { useTheme } from '../context/theme';

interface Props {
    examType: ExamType;
    description: string;
    subjectCount: number;
    onPress: () => void;
    index: number;
}

export default function ExamCard({ examType, description, subjectCount, onPress, index }: Props) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const { colors, isDark } = useTheme();

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 600, delay: index * 200, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, delay: index * 200, useNativeDriver: true }),
        ]).start();
    }, []);

    const isBece = examType === 'BECE';
    const bgColor = isBece ? colors.beceGradientEnd : colors.wassceGradientEnd;
    const emoji = isBece ? '🎓' : '🏆';

    return (
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <TouchableOpacity style={[styles.card, { backgroundColor: bgColor }]} onPress={onPress} activeOpacity={0.85}>
                <View style={[styles.emojiContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                    <Text style={styles.emoji}>{emoji}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={[styles.title, { color: isDark ? DarkColors.text : '#FFFFFF' }]}>{examType}</Text>
                    <Text style={[styles.description, { color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.95)' }]}>{description}</Text>
                    <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }]}>
                        <Text style={[styles.badgeText, { color: isDark ? DarkColors.text : '#FFFFFF' }]}>{subjectCount} Subjects</Text>
                    </View>
                </View>
                <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        marginBottom: Spacing.md,
        ...Shadow.md,
    },
    emojiContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    emoji: { fontSize: 28 },
    content: { flex: 1 },
    title: { fontSize: FontSize.xxl, fontWeight: '800', marginBottom: 4 },
    description: { fontSize: FontSize.sm, marginBottom: Spacing.sm },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
    },
    badgeText: { fontSize: FontSize.xs, fontWeight: '600' },
    arrow: { fontSize: 24, color: 'rgba(255,255,255,0.6)', marginLeft: Spacing.sm },
});
