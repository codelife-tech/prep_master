import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors, Spacing, FontSize } from '../constants/theme';
import { exams } from '../data';
import ExamCard from '../components/ExamCard';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.logo}>📚</Text>
                    <Text style={styles.title}>PrepMaster GH</Text>
                    <Text style={styles.subtitle}>Ace your BECE & WASSCE exams with past questions</Text>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>9</Text>
                        <Text style={styles.statLabel}>Subjects</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>135</Text>
                        <Text style={styles.statLabel}>Questions</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.stat}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>Years</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Choose Your Exam</Text>

                {exams.map((exam, i) => (
                    <ExamCard
                        key={exam.type}
                        examType={exam.type}
                        description={exam.description}
                        subjectCount={exam.subjects.length}
                        index={i}
                        onPress={() => router.push({ pathname: '/subjects', params: { exam: exam.type } })}
                    />
                ))}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>🇬🇭 Made for Ghanaian students</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    scroll: { padding: Spacing.lg, paddingTop: Spacing.xxl },
    header: { alignItems: 'center', marginBottom: Spacing.xl },
    logo: { fontSize: 56, marginBottom: Spacing.sm },
    title: { fontSize: FontSize.hero, fontWeight: '900', color: Colors.text, letterSpacing: -1 },
    subtitle: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', marginTop: Spacing.xs },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: Spacing.lg,
        marginBottom: Spacing.xl,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    stat: { alignItems: 'center' },
    statNumber: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.primary },
    statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
    statDivider: { width: 1, height: 32, backgroundColor: Colors.border },
    sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, marginBottom: Spacing.md },
    footer: { alignItems: 'center', paddingVertical: Spacing.xl },
    footerText: { fontSize: FontSize.sm, color: Colors.textMuted },
});
