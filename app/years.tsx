import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';
import { getSubject } from '../data';
import { useTheme } from '../context/theme';

export default function YearsScreen() {
    const { exam, subject } = useLocalSearchParams<{ exam: string; subject: string }>();
    const router = useRouter();
    const subjectData = getSubject(exam || '', subject || '');
    const { colors } = useTheme();

    if (!subjectData) return <View style={[styles.container, { backgroundColor: colors.background }]}><Text style={[styles.errorText, { color: colors.error }]}>Subject not found</Text></View>;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.icon}>{subjectData.icon}</Text>
                    <Text style={[styles.title, { color: colors.text }]}>{subjectData.name}</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{exam} Past Questions</Text>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Years</Text>

                {subjectData.years.map((yearData, i) => (
                    <YearItem
                        key={yearData.year}
                        year={yearData.year}
                        questionCount={yearData.questions.length}
                        index={i}
                        onPressQuestions={() =>
                            router.push({ pathname: '/questions', params: { exam, subject, year: String(yearData.year) } })
                        }
                        onPressQuiz={() =>
                            router.push({ pathname: '/quiz', params: { exam, subject, year: String(yearData.year) } })
                        }
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

function YearItem({ year, questionCount, index, onPressQuestions, onPressQuiz }: {
    year: number; questionCount: number; index: number;
    onPressQuestions: () => void; onPressQuiz: () => void;
}) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { colors } = useTheme();

    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay: index * 150, useNativeDriver: true }).start();
    }, []);

    return (
        <Animated.View style={[styles.yearCard, { opacity: fadeAnim, backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.yearHeader}>
                <Text style={[styles.yearText, { color: colors.accent }]}>{year}</Text>
                <Text style={[styles.qCount, { color: colors.textSecondary }]}>{questionCount} Questions</Text>
            </View>
            <View style={styles.btnRow}>
                <TouchableOpacity style={[styles.btnStudy, { backgroundColor: colors.surfaceLight, borderColor: colors.border }]} onPress={onPressQuestions} activeOpacity={0.8}>
                    <Text style={[styles.btnStudyText, { color: colors.text }]}>📖 Study</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btnQuiz, { backgroundColor: colors.primary }]} onPress={onPressQuiz} activeOpacity={0.8}>
                    <Text style={styles.btnQuizText}>⚡ Quiz Me</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: Spacing.lg },
    header: { alignItems: 'center', marginBottom: Spacing.xl, paddingTop: Spacing.md },
    icon: { fontSize: 48, marginBottom: Spacing.sm },
    title: { fontSize: FontSize.xl, fontWeight: '800' },
    subtitle: { fontSize: FontSize.sm, marginTop: Spacing.xs },
    sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', marginBottom: Spacing.md },
    yearCard: {
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg, marginBottom: Spacing.md,
        borderWidth: 1, ...Shadow.sm,
    },
    yearHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
    yearText: { fontSize: FontSize.xxl, fontWeight: '900' },
    qCount: { fontSize: FontSize.sm },
    btnRow: { flexDirection: 'row', gap: Spacing.sm },
    btnStudy: {
        flex: 1, borderRadius: BorderRadius.sm,
        paddingVertical: Spacing.sm, alignItems: 'center', borderWidth: 1,
    },
    btnStudyText: { fontSize: FontSize.md, fontWeight: '600' },
    btnQuiz: {
        flex: 1, borderRadius: BorderRadius.sm,
        paddingVertical: Spacing.sm, alignItems: 'center',
    },
    btnQuizText: { fontSize: FontSize.md, fontWeight: '600', color: '#fff' },
    errorText: { fontSize: FontSize.md, textAlign: 'center', marginTop: 100 },
});
