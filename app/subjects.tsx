import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Spacing, FontSize } from '../constants/theme';
import { getExam } from '../data';
import SubjectCard from '../components/SubjectCard';
import { useTheme } from '../context/theme';
import { questionService } from '../services/questionService';
import { Subject } from '../types';

export default function SubjectsScreen() {
    const { exam } = useLocalSearchParams<{ exam: string }>();
    const router = useRouter();
    const { colors } = useTheme();
    const localExam = getExam(exam || 'BECE');

    const [subjects, setSubjects] = useState<Subject[]>(localExam?.subjects || []);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSubjects();
    }, [exam]);

    const loadSubjects = async () => {
        try {
            const dbSubjects = await questionService.fetchSubjects(exam || 'BECE');
            if (dbSubjects.length > 0) {
                setSubjects(dbSubjects);
            }
        } catch (err) {
            console.log('Using local subjects data');
        } finally {
            setLoading(false);
        }
    };

    if (!localExam && subjects.length === 0) {
        return <View style={[styles.container, { backgroundColor: colors.background }]}><Text style={[styles.errorText, { color: colors.error }]}>Exam not found</Text></View>;
    }

    const totalQuestions = subjects.reduce(
        (sum, s) => sum + s.years.reduce((ys, y) => ys + y.questions.length, 0), 0
    );

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={[styles.examType, { color: colors.primary }]}>{exam || 'BECE'}</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{localExam?.description || ''}</Text>
                    <Text style={[styles.totalBadge, { color: colors.accent }]}>{totalQuestions} total questions</Text>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Select a Subject</Text>

                {loading && subjects.length === 0 ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
                ) : (
                    <View style={styles.grid}>
                        {subjects.map((subject, i) => {
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
                )}
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
