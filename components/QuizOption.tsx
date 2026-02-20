import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/theme';

interface Props {
    label: string;
    index: number;
    selected: boolean;
    isCorrect?: boolean | null;
    showResult: boolean;
    onPress: () => void;
}

export default function QuizOption({ label, index, selected, isCorrect, showResult, onPress }: Props) {
    const letter = String.fromCharCode(65 + index);
    let bg = Colors.surfaceLight;
    let borderCol = Colors.border;
    let textCol = Colors.text;

    if (showResult && selected && isCorrect) {
        bg = 'rgba(0,200,83,0.2)';
        borderCol = Colors.primary;
        textCol = Colors.primary;
    } else if (showResult && selected && !isCorrect) {
        bg = 'rgba(255,82,82,0.2)';
        borderCol = Colors.error;
        textCol = Colors.error;
    } else if (showResult && isCorrect) {
        bg = 'rgba(0,200,83,0.1)';
        borderCol = Colors.primary;
    } else if (selected) {
        bg = 'rgba(0,200,83,0.12)';
        borderCol = Colors.primary;
    }

    return (
        <TouchableOpacity
            style={[styles.option, { backgroundColor: bg, borderColor: borderCol }]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={showResult}
        >
            <View style={[styles.letterBadge, selected && { backgroundColor: Colors.primary }]}>
                <Text style={[styles.letter, selected && { color: '#fff' }]}>{letter}</Text>
            </View>
            <Text style={[styles.text, { color: textCol }]}>{label}</Text>
            {showResult && selected && isCorrect && <Text style={styles.icon}>✓</Text>}
            {showResult && selected && !isCorrect && <Text style={[styles.icon, { color: Colors.error }]}>✗</Text>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        borderWidth: 1.5,
    },
    letterBadge: {
        width: 32, height: 32, borderRadius: 16,
        backgroundColor: Colors.surfaceLight,
        justifyContent: 'center', alignItems: 'center',
        marginRight: Spacing.sm,
        borderWidth: 1, borderColor: Colors.border,
    },
    letter: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.textSecondary },
    text: { flex: 1, fontSize: FontSize.md, fontWeight: '500' },
    icon: { fontSize: 20, fontWeight: '700', color: Colors.primary, marginLeft: Spacing.sm },
});
