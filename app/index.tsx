import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Spacing, FontSize } from '../constants/theme';
import { exams } from '../data';
import ExamCard from '../components/ExamCard';
import { useAuth } from '../context/auth';
import { supabase } from '../constants/supabase';
import { useTheme } from '../context/theme';

export default function HomeScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const { colors, theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace('/auth/login');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.topBar}>
                    <View>
                        <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>Hi, {user?.user_metadata?.full_name || 'Student'}</Text>
                        <TouchableOpacity onPress={handleLogout}>
                            <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={[styles.themeToggle, { backgroundColor: colors.surfaceLight }]} onPress={toggleTheme}>
                        <Text style={{ fontSize: 20 }}>{theme === 'light' ? '🌙' : '☀️'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.header}>
                    <Text style={styles.logo}>📚</Text>
                    <Text style={[styles.title, { color: colors.text }]}>PrepMaster GH</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Ace your BECE & WASSCE exams with past questions</Text>
                </View>

                <View style={[styles.statsRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <View style={styles.stat}>
                        <Text style={[styles.statNumber, { color: colors.primary }]}>9</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Subjects</Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
                    <View style={styles.stat}>
                        <Text style={[styles.statNumber, { color: colors.primary }]}>135</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Questions</Text>
                    </View>
                    <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
                    <View style={styles.stat}>
                        <Text style={[styles.statNumber, { color: colors.primary }]}>3</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Years</Text>
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Choose Your Exam</Text>

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
                    <Text style={[styles.footerText, { color: colors.textMuted }]}>🇬🇭 Made for Ghanaian students</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: Spacing.lg, paddingTop: Spacing.md },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    welcomeText: { fontSize: FontSize.sm, fontWeight: '600' },
    logoutText: { fontSize: FontSize.sm, fontWeight: '700' },
    themeToggle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: { alignItems: 'center', marginBottom: Spacing.xl },
    logo: { fontSize: 56, marginBottom: Spacing.sm },
    title: { fontSize: FontSize.hero, fontWeight: '900', letterSpacing: -1 },
    subtitle: { fontSize: FontSize.md, textAlign: 'center', marginTop: Spacing.xs },
    statsRow: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: Spacing.lg,
        marginBottom: Spacing.xl,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
    },
    stat: { alignItems: 'center' },
    statNumber: { fontSize: FontSize.xxl, fontWeight: '800' },
    statLabel: { fontSize: FontSize.xs, marginTop: 2 },
    statDivider: { width: 1, height: 32 },
    sectionTitle: { fontSize: FontSize.lg, fontWeight: '700', marginBottom: Spacing.md },
    footer: { alignItems: 'center', paddingVertical: Spacing.xl },
    footerText: { fontSize: FontSize.sm },
});
