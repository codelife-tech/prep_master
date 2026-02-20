import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Spacing, FontSize, BorderRadius } from '../constants/theme';
import { getYearData, getSubject } from '../data';
import QuestionCard from '../components/QuestionCard';
import { useTheme } from '../context/theme';

export default function QuestionsScreen() {
    const { exam, subject, year } = useLocalSearchParams<{ exam: string; subject: string; year: string }>();
    const router = useRouter();
    const yearNum = parseInt(year || '2022');
    const yearData = getYearData(exam || '', subject || '', yearNum);
    const subjectData = getSubject(exam || '', subject || '');
    const { colors } = useTheme();

    if (!yearData || !subjectData) {
        return <View style={[styles.container, { backgroundColor: colors.background }]}><Text style={[styles.errorText, { color: colors.error }]}>Questions not found</Text></View>;
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={[styles.badge, { color: colors.accent }]}>{exam} · {yearNum}</Text>
                    <Text style={[styles.title, { color: colors.text }]}>{subjectData.name}</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{yearData.questions.length} Past Questions</Text>
                </View>

                <TouchableOpacity
                    style={[styles.quizButton, { backgroundColor: colors.primary }]}
                    activeOpacity={0.8}
                    onPress={() => router.push({ pathname: '/quiz', params: { exam, subject, year } })}
                >
                    <Text style={styles.quizButtonText}>⚡ Start Quiz Mode</Text>
                </TouchableOpacity>

                {yearData.questions.map((q, i) => (
                    <QuestionCard key={q.id} question={q} index={i} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: Spacing.lg },
    header: { alignItems: 'center', marginBottom: Spacing.lg, paddingTop: Spacing.md },
    badge: { fontSize: FontSize.xs, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
    title: { fontSize: FontSize.xl, fontWeight: '800', marginTop: Spacing.xs },
    subtitle: { fontSize: FontSize.sm, marginTop: Spacing.xs },
    quizButton: {
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md, alignItems: 'center', marginBottom: Spacing.lg,
    },
    quizButtonText: { fontSize: FontSize.lg, fontWeight: '700', color: '#fff' },
    errorText: { fontSize: FontSize.md, textAlign: 'center', marginTop: 100 },
});
