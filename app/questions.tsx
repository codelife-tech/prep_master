import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius } from '../constants/theme';
import { getYearData, getSubject } from '../data';
import QuestionCard from '../components/QuestionCard';

export default function QuestionsScreen() {
    const { exam, subject, year } = useLocalSearchParams<{ exam: string; subject: string; year: string }>();
    const router = useRouter();
    const yearNum = parseInt(year || '2022');
    const yearData = getYearData(exam || '', subject || '', yearNum);
    const subjectData = getSubject(exam || '', subject || '');

    if (!yearData || !subjectData) {
        return <View style={styles.container}><Text style={styles.errorText}>Questions not found</Text></View>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.badge}>{exam} · {yearNum}</Text>
                    <Text style={styles.title}>{subjectData.name}</Text>
                    <Text style={styles.subtitle}>{yearData.questions.length} Past Questions</Text>
                </View>

                <TouchableOpacity
                    style={styles.quizButton}
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
    container: { flex: 1, backgroundColor: Colors.background },
    scroll: { padding: Spacing.lg },
    header: { alignItems: 'center', marginBottom: Spacing.lg, paddingTop: Spacing.md },
    badge: { fontSize: FontSize.xs, color: Colors.accent, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
    title: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text, marginTop: Spacing.xs },
    subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
    quizButton: {
        backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md, alignItems: 'center', marginBottom: Spacing.lg,
    },
    quizButtonText: { fontSize: FontSize.lg, fontWeight: '700', color: '#fff' },
    errorText: { color: Colors.error, fontSize: FontSize.md, textAlign: 'center', marginTop: 100 },
});
