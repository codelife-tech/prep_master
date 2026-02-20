import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';
import { getSubject } from '../data';

export default function YearsScreen() {
    const { exam, subject } = useLocalSearchParams<{ exam: string; subject: string }>();
    const router = useRouter();
    const subjectData = getSubject(exam || '', subject || '');

    if (!subjectData) return <View style={styles.container}><Text style={styles.errorText}>Subject not found</Text></View>;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.icon}>{subjectData.icon}</Text>
                    <Text style={styles.title}>{subjectData.name}</Text>
                    <Text style={styles.subtitle}>{exam} Past Questions</Text>
                </View>

                <Text style={styles.sectionTitle}>Available Years</Text>

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
    useEffect(() => {
        Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay: index * 150, useNativeDriver: true }).start();
    }, []);

    return (
        <Animated.View style={[styles.yearCard, { opacity: fadeAnim }]}>
            <View style={styles.yearHeader}>
                <Text style={styles.yearText}>{year}</Text>
                <Text style={styles.qCount}>{questionCount} Questions</Text>
            </View>
            <View style={styles.btnRow}>
                <TouchableOpacity style={styles.btnStudy} onPress={onPressQuestions} activeOpacity={0.8}>
                    <Text style={styles.btnStudyText}>📖 Study</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnQuiz} onPress={onPressQuiz} activeOpacity={0.8}>
                    <Text style={styles.btnQuizText}>⚡ Quiz Me</Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scroll: { padding: Spacing.lg },
    header: { alignItems: 'center', marginBottom: Spacing.xl, paddingTop: Spacing.md },
    icon: { fontSize: 48, marginBottom: Spacing.sm },
    title: { fontSize: FontSize.xl, fontWeight: '800', color: Colors.text },
    subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
    sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.md },
    yearCard: {
        backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
        padding: Spacing.lg, marginBottom: Spacing.md,
        borderWidth: 1, borderColor: Colors.border, ...Shadow.sm,
    },
    yearHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
    yearText: { fontSize: FontSize.xxl, fontWeight: '900', color: Colors.accent },
    qCount: { fontSize: FontSize.sm, color: Colors.textSecondary },
    btnRow: { flexDirection: 'row', gap: Spacing.sm },
    btnStudy: {
        flex: 1, backgroundColor: Colors.surfaceLight, borderRadius: BorderRadius.sm,
        paddingVertical: Spacing.sm, alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
    },
    btnStudyText: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
    btnQuiz: {
        flex: 1, backgroundColor: Colors.primary, borderRadius: BorderRadius.sm,
        paddingVertical: Spacing.sm, alignItems: 'center',
    },
    btnQuizText: { fontSize: FontSize.md, fontWeight: '600', color: '#fff' },
    errorText: { color: Colors.error, fontSize: FontSize.md, textAlign: 'center', marginTop: 100 },
});
