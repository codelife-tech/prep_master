import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Spacing, BorderRadius, FontSize } from '../constants/theme';
import { useTheme } from '../context/theme';

interface Props {
    label: string;
    index: number;
    selected: boolean;
    isCorrect?: boolean | null;
    showResult: boolean;
    onPress: () => void;
}

export default function QuizOption({ label, index, selected, isCorrect, showResult, onPress }: Props) {
    const { colors } = useTheme();
    const letter = String.fromCharCode(65 + index);

    let bg = colors.surfaceLight;
    let borderCol = colors.border;
    let textCol = colors.text;

    if (showResult && selected && isCorrect) {
        bg = 'rgba(0,200,83,0.2)';
        borderCol = colors.primary;
        textCol = colors.primary;
    } else if (showResult && selected && !isCorrect) {
        bg = 'rgba(255,82,82,0.2)';
        borderCol = colors.error;
        textCol = colors.error;
    } else if (showResult && isCorrect) {
        bg = 'rgba(0,200,83,0.1)';
        borderCol = colors.primary;
    } else if (selected) {
        bg = 'rgba(0,200,83,0.12)';
        borderCol = colors.primary;
    }

    return (
        <TouchableOpacity
            style={[styles.option, { backgroundColor: bg, borderColor: borderCol }]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={showResult}
        >
            <View style={[styles.letterBadge, { backgroundColor: colors.surfaceLight, borderColor: colors.border }, selected && { backgroundColor: colors.primary, borderColor: colors.primary }]}>
                <Text style={[styles.letter, { color: colors.textSecondary }, selected && { color: '#fff' }]}>{letter}</Text>
            </View>
            <Text style={[styles.text, { color: textCol }]}>{label}</Text>
            {showResult && selected && isCorrect && <Text style={[styles.icon, { color: colors.primary }]}>✓</Text>}
            {showResult && selected && !isCorrect && <Text style={[styles.icon, { color: colors.error }]}>✗</Text>}
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
        justifyContent: 'center', alignItems: 'center',
        marginRight: Spacing.sm,
        borderWidth: 1,
    },
    letter: { fontSize: FontSize.sm, fontWeight: '700' },
    text: { flex: 1, fontSize: FontSize.md, fontWeight: '500' },
    icon: { fontSize: 20, fontWeight: '700', marginLeft: Spacing.sm },
});
