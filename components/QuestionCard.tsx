import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize, Shadow } from '../constants/theme';
import { Question } from '../types';

interface Props {
    question: Question;
    index: number;
}

export default function QuestionCard({ question, index }: Props) {
    const [expanded, setExpanded] = useState(false);

    return (
        <TouchableOpacity style={styles.card} onPress={() => setExpanded(!expanded)} activeOpacity={0.85}>
            <View style={styles.header}>
                <View style={styles.numberBadge}>
                    <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <Text style={styles.question}>{question.question}</Text>
            </View>

            {question.options.map((opt, i) => (
                <View key={i} style={[styles.option, expanded && i === question.correctAnswer && styles.correctOption]}>
                    <Text style={styles.optionLabel}>{String.fromCharCode(65 + i)}.</Text>
                    <Text style={[styles.optionText, expanded && i === question.correctAnswer && styles.correctText]}>{opt}</Text>
                    {expanded && i === question.correctAnswer && <Text style={styles.checkmark}>✓</Text>}
                </View>
            ))}

            {expanded && (
                <View style={styles.explanationBox}>
                    <Text style={styles.explanationLabel}>💡 Explanation</Text>
                    <Text style={styles.explanationText}>{question.explanation}</Text>
                </View>
            )}

            <Text style={styles.tapHint}>{expanded ? 'Tap to collapse' : 'Tap to reveal answer'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.surface,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        ...Shadow.sm,
    },
    header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: Spacing.md },
    numberBadge: {
        width: 28, height: 28, borderRadius: 14,
        backgroundColor: Colors.primary,
        justifyContent: 'center', alignItems: 'center',
        marginRight: Spacing.sm,
    },
    numberText: { color: '#fff', fontSize: FontSize.sm, fontWeight: '700' },
    question: { flex: 1, fontSize: FontSize.md, color: Colors.text, fontWeight: '600', lineHeight: 22 },
    option: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: Colors.surfaceLight,
        borderRadius: BorderRadius.sm,
        padding: Spacing.sm,
        marginBottom: Spacing.xs,
    },
    correctOption: { backgroundColor: 'rgba(0,200,83,0.15)', borderWidth: 1, borderColor: Colors.primary },
    optionLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '700', marginRight: Spacing.sm, width: 20 },
    optionText: { flex: 1, fontSize: FontSize.sm, color: Colors.text },
    correctText: { color: Colors.primary, fontWeight: '600' },
    checkmark: { fontSize: 16, color: Colors.primary, marginLeft: Spacing.xs },
    explanationBox: {
        marginTop: Spacing.sm,
        backgroundColor: 'rgba(255,215,0,0.08)',
        borderRadius: BorderRadius.sm,
        padding: Spacing.md,
        borderLeftWidth: 3,
        borderLeftColor: Colors.accent,
    },
    explanationLabel: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.accent, marginBottom: 4 },
    explanationText: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
    tapHint: { textAlign: 'center', fontSize: FontSize.xs, color: Colors.textMuted, marginTop: Spacing.sm },
});
