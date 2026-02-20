import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize, Shadow } from '../constants/theme';
import { ExamType } from '../types';

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

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, { toValue: 1, duration: 600, delay: index * 200, useNativeDriver: true }),
            Animated.timing(slideAnim, { toValue: 0, duration: 600, delay: index * 200, useNativeDriver: true }),
        ]).start();
    }, []);

    const isBece = examType === 'BECE';
    const bgColor = isBece ? Colors.beceGradientEnd : Colors.wassceGradientEnd;
    const emoji = isBece ? '🎓' : '🏆';

    return (
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <TouchableOpacity style={[styles.card, { backgroundColor: bgColor }]} onPress={onPress} activeOpacity={0.85}>
                <View style={styles.emojiContainer}>
                    <Text style={styles.emoji}>{emoji}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{examType}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{subjectCount} Subjects</Text>
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
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.md,
    },
    emoji: { fontSize: 28 },
    content: { flex: 1 },
    title: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.text, marginBottom: 4 },
    description: { fontSize: FontSize.sm, color: 'rgba(255,255,255,0.85)', marginBottom: Spacing.sm },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.25)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: BorderRadius.full,
    },
    badgeText: { fontSize: FontSize.xs, color: Colors.text, fontWeight: '600' },
    arrow: { fontSize: 24, color: 'rgba(255,255,255,0.6)', marginLeft: Spacing.sm },
});
