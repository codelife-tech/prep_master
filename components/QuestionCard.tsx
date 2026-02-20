import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Spacing, BorderRadius, FontSize, Shadow } from '../constants/theme';
import { Question } from '../types';
import { useTheme } from '../context/theme';

interface Props {
    question: Question;
    index: number;
}

export default function QuestionCard({ question, index }: Props) {
    const [expanded, setExpanded] = useState(false);
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]} onPress={() => setExpanded(!expanded)} activeOpacity={0.85}>
            <View style={styles.header}>
                <View style={[styles.numberBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <Text style={[styles.question, { color: colors.text }]}>{question.question}</Text>
            </View>

            {question.options.map((opt, i) => {
                const isCorrect = expanded && i === question.correctAnswer;
                return (
                    <View key={i} style={[
                        styles.option,
                        { backgroundColor: colors.surfaceLight },
                        isCorrect && { backgroundColor: 'rgba(0,200,83,0.15)', borderWidth: 1, borderColor: colors.primary }
                    ]}>
                        <Text style={[styles.optionLabel, { color: colors.textSecondary }]}>{String.fromCharCode(65 + i)}.</Text>
                        <Text style={[
                            styles.optionText,
                            { color: colors.text },
                            isCorrect && { color: colors.primary, fontWeight: '600' }
                        ]}>{opt}</Text>
                        {isCorrect && <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>}
                    </View>
                );
            })}

            {expanded && (
                <View style={[styles.explanationBox, { borderLeftColor: colors.accent }]}>
                    <Text style={[styles.explanationLabel, { color: colors.accent }]}>💡 Explanation</Text>
                    <Text style={[styles.explanationText, { color: colors.textSecondary }]}>{question.explanation}</Text>
                </View>
            )}

            <Text style={[styles.tapHint, { color: colors.textMuted }]}>{expanded ? 'Tap to collapse' : 'Tap to reveal answer'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        borderWidth: 1,
        ...Shadow.sm,
    },
    header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.md },
    numberBadge: {
        width: 28, height: 28, borderRadius: 14,
        justifyContent: 'center', alignItems: 'center',
        marginRight: Spacing.sm,
    },
    numberText: { color: '#fff', fontSize: FontSize.sm, fontWeight: '700' },
    question: { flex: 1, fontSize: FontSize.md, fontWeight: '600', lineHeight: 22 },
    option: {
        flexDirection: 'row', alignItems: 'center',
        borderRadius: BorderRadius.sm,
        padding: Spacing.sm,
        marginBottom: Spacing.xs,
    },
    optionLabel: { fontSize: FontSize.sm, fontWeight: '700', marginRight: Spacing.sm, width: 20 },
    optionText: { flex: 1, fontSize: FontSize.sm },
    checkmark: { fontSize: 16, marginLeft: Spacing.xs },
    explanationBox: {
        marginTop: Spacing.sm,
        backgroundColor: 'rgba(255,215,0,0.08)',
        borderRadius: BorderRadius.sm,
        padding: Spacing.md,
        borderLeftWidth: 3,
    },
    explanationLabel: { fontSize: FontSize.sm, fontWeight: '700', marginBottom: 4 },
    explanationText: { fontSize: FontSize.sm, lineHeight: 20 },
    tapHint: { textAlign: 'center', fontSize: FontSize.xs, marginTop: Spacing.sm },
});
