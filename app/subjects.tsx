import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Spacing, FontSize } from '../constants/theme';
import { getExam } from '../data';
import SubjectCard from '../components/SubjectCard';
import { useTheme } from '../context/theme';

export default function SubjectsScreen() {
    const { exam } = useLocalSearchParams<{ exam: string }>();
    const router = useRouter();
    const examData = getExam(exam || 'BECE');
    const { colors } = useTheme();

    if (!examData) return <View style={[styles.container, { backgroundColor: colors.background }]}><Text style={[styles.errorText, { color: colors.error }]}>Exam not found</Text></View>;

    const totalQuestions = examData.subjects.reduce(
        (sum, s) => sum + s.years.reduce((ys, y) => ys + y.questions.length, 0), 0
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={[styles.examType, { color: colors.primary }]}>{examData.type}</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{examData.description}</Text>
                    <Text style={[styles.totalBadge, { color: colors.accent }]}>{totalQuestions} total questions</Text>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Select a Subject</Text>

                <View style={styles.grid}>
                    {examData.subjects.map((subject, i) => {
                        const qCount = subject.years.reduce((s, y) => s + y.questions.length, 0);
                        return (
                            <SubjectCard
                                key={subject.id}
                                name={subject.name}
                                icon={subject.icon}
                                questionCount={qCount}
                                index={i}
                                onPress={() => router.push({ pathname: '/years', params: { exam: exam, subject: subject.id } })}
                            />
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: Spacing.lg },
    header: { alignItems: 'center', marginBottom: Spacing.xl, paddingTop: Spacing.md },
    examType: { fontSize: FontSize.xxl, fontWeight: '900' },
    subtitle: { fontSize: FontSize.sm, marginTop: Spacing.xs, textAlign: 'center' },
    totalBadge: { fontSize: FontSize.xs, marginTop: Spacing.sm, fontWeight: '600' },
    sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', marginBottom: Spacing.md },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    errorText: { fontSize: FontSize.md, textAlign: 'center', marginTop: 100 },
});
