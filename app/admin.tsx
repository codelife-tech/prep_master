import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity,
    TextInput, Alert, ActivityIndicator, Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import { Spacing, FontSize, BorderRadius } from '../constants/theme';
import { useTheme } from '../context/theme';
import { adminService } from '../services/adminService';
import { Ionicons } from '@expo/vector-icons';

interface QuestionData {
    id: string;
    slug: string;
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
    year: number;
    subjects: { slug: string; name: string; exams: { type: string } };
}

export default function AdminScreen() {
    const { colors } = useTheme();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalExams: 0, totalSubjects: 0, totalQuestions: 0, totalUsers: 0 });
    const [subjects, setSubjects] = useState<any[]>([]);
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<QuestionData | null>(null);

    // Form state
    const [formSlug, setFormSlug] = useState('');
    const [formQuestion, setFormQuestion] = useState('');
    const [formOptions, setFormOptions] = useState(['', '', '', '']);
    const [formCorrectAnswer, setFormCorrectAnswer] = useState(0);
    const [formExplanation, setFormExplanation] = useState('');
    const [formYear, setFormYear] = useState('2022');
    const [formSubject, setFormSubject] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        checkAndLoad();
    }, []);

    const checkAndLoad = async () => {
        const isAdmin = await adminService.isAdmin();
        if (!isAdmin) {
            Alert.alert('Access Denied', 'You do not have admin privileges.');
            router.back();
            return;
        }
        await loadData();
    };

    const loadData = async () => {
        setLoading(true);
        try {
            const [statsData, subjectsData, questionsData] = await Promise.all([
                adminService.getStats(),
                adminService.getAllSubjects(),
                adminService.getAllQuestions(selectedSubject || undefined),
            ]);
            setStats(statsData);
            setSubjects(subjectsData);
            setQuestions(questionsData);
        } catch (err) {
            console.error('Admin load error:', err);
        } finally {
            setLoading(false);
        }
    };

    const filterBySubject = async (slug: string | null) => {
        setSelectedSubject(slug);
        setLoading(true);
        try {
            const data = await adminService.getAllQuestions(slug || undefined);
            setQuestions(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormSlug('');
        setFormQuestion('');
        setFormOptions(['', '', '', '']);
        setFormCorrectAnswer(0);
        setFormExplanation('');
        setFormYear('2022');
        setFormSubject(selectedSubject || '');
    };

    const handleAdd = () => {
        resetForm();
        setFormSubject(selectedSubject || (subjects.length > 0 ? subjects[0].slug : ''));
        setShowAddModal(true);
    };

    const handleEdit = (q: QuestionData) => {
        setEditingQuestion(q);
        setFormQuestion(q.question);
        setFormOptions([...q.options]);
        setFormCorrectAnswer(q.correct_answer);
        setFormExplanation(q.explanation);
        setShowEditModal(true);
    };

    const handleDelete = (q: QuestionData) => {
        Alert.alert(
            'Delete Question',
            `Are you sure you want to delete this question?\n\n"${q.question.substring(0, 60)}..."`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', style: 'destructive', onPress: async () => {
                        try {
                            await adminService.deleteQuestion(q.id);
                            await loadData();
                        } catch (err: any) {
                            Alert.alert('Error', err.message);
                        }
                    }
                },
            ]
        );
    };

    const saveNewQuestion = async () => {
        if (!formSubject || !formQuestion || formOptions.some(o => !o.trim()) || !formSlug) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        setSaving(true);
        try {
            await adminService.addQuestion(formSubject, parseInt(formYear), {
                slug: formSlug,
                question: formQuestion,
                options: formOptions,
                correct_answer: formCorrectAnswer,
                explanation: formExplanation,
            });
            setShowAddModal(false);
            await loadData();
        } catch (err: any) {
            Alert.alert('Error', err.message);
        } finally {
            setSaving(false);
        }
    };

    const saveEditQuestion = async () => {
        if (!editingQuestion || !formQuestion || formOptions.some(o => !o.trim())) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        setSaving(true);
        try {
            await adminService.updateQuestion(editingQuestion.id, {
                question: formQuestion,
                options: formOptions,
                correct_answer: formCorrectAnswer,
                explanation: formExplanation,
            });
            setShowEditModal(false);
            await loadData();
        } catch (err: any) {
            Alert.alert('Error', err.message);
        } finally {
            setSaving(false);
        }
    };

    const updateOption = (index: number, value: string) => {
        const newOpts = [...formOptions];
        newOpts[index] = value;
        setFormOptions(newOpts);
    };

    if (loading && questions.length === 0) {
        return (
            <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 100 }} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scroll}>
                {/* Header */}
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color={colors.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: colors.text }]}>Admin Panel</Text>
                    <TouchableOpacity onPress={loadData}>
                        <Ionicons name="refresh" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Stats */}
                <View style={[styles.statsGrid, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <View style={styles.statItem}>
                        <Text style={[styles.statNum, { color: colors.primary }]}>{stats.totalUsers}</Text>
                        <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Users</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={[styles.statNum, { color: colors.primary }]}>{stats.totalSubjects}</Text>
                        <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Subjects</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={[styles.statNum, { color: colors.primary }]}>{stats.totalQuestions}</Text>
                        <Text style={[styles.statLbl, { color: colors.textSecondary }]}>Questions</Text>
                    </View>
                </View>

                {/* Subject Filter */}
                <Text style={[styles.sectionTitle, { color: colors.text }]}>Filter by Subject</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
                    <TouchableOpacity
                        style={[styles.filterChip, !selectedSubject && { backgroundColor: colors.primary }]}
                        onPress={() => filterBySubject(null)}
                    >
                        <Text style={[styles.filterText, !selectedSubject && { color: '#fff' }]}>All</Text>
                    </TouchableOpacity>
                    {subjects.map((s) => (
                        <TouchableOpacity
                            key={s.id}
                            style={[styles.filterChip, selectedSubject === s.slug && { backgroundColor: colors.primary }]}
                            onPress={() => filterBySubject(s.slug)}
                        >
                            <Text style={[styles.filterText, selectedSubject === s.slug && { color: '#fff' }]}>
                                {s.icon} {s.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Add Button */}
                <TouchableOpacity
                    style={[styles.addBtn, { backgroundColor: colors.primary }]}
                    onPress={handleAdd}
                >
                    <Ionicons name="add" size={20} color="#fff" />
                    <Text style={styles.addBtnText}>Add Question</Text>
                </TouchableOpacity>

                {/* Questions List */}
                <Text style={[styles.sectionTitle, { color: colors.text, marginTop: Spacing.md }]}>
                    Questions ({questions.length})
                </Text>

                {questions.map((q) => (
                    <View key={q.id} style={[styles.questionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.qHeader}>
                            <View style={styles.qBadges}>
                                <Text style={[styles.qBadge, { backgroundColor: colors.primary + '20', color: colors.primary }]}>
                                    {q.subjects?.name}
                                </Text>
                                <Text style={[styles.qBadge, { backgroundColor: colors.accent + '20', color: colors.accent }]}>
                                    {q.year}
                                </Text>
                            </View>
                            <View style={styles.qActions}>
                                <TouchableOpacity onPress={() => handleEdit(q)} style={styles.actionBtn}>
                                    <Ionicons name="pencil" size={18} color={colors.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(q)} style={styles.actionBtn}>
                                    <Ionicons name="trash" size={18} color={colors.error} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={[styles.qText, { color: colors.text }]} numberOfLines={2}>{q.question}</Text>
                        <Text style={[styles.qAnswer, { color: colors.textSecondary }]}>
                            Answer: {q.options[q.correct_answer]}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Add Question Modal */}
            <Modal visible={showAddModal} animationType="slide">
                <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setShowAddModal(false)}>
                                <Ionicons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>Add Question</Text>
                            <View style={{ width: 24 }} />
                        </View>

                        <Text style={[styles.label, { color: colors.text }]}>Subject</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: Spacing.md }}>
                            {subjects.map((s) => (
                                <TouchableOpacity
                                    key={s.id}
                                    style={[styles.filterChip, formSubject === s.slug && { backgroundColor: colors.primary }]}
                                    onPress={() => setFormSubject(s.slug)}
                                >
                                    <Text style={[styles.filterText, formSubject === s.slug && { color: '#fff' }]}>
                                        {s.icon} {s.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <Text style={[styles.label, { color: colors.text }]}>Slug (unique ID)</Text>
                        <TextInput style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceLight, borderColor: colors.border }]}
                            value={formSlug} onChangeText={setFormSlug} placeholder="e.g. bm23-1" placeholderTextColor={colors.textMuted} />

                        <Text style={[styles.label, { color: colors.text }]}>Year</Text>
                        <TextInput style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceLight, borderColor: colors.border }]}
                            value={formYear} onChangeText={setFormYear} keyboardType="numeric" placeholderTextColor={colors.textMuted} />

                        <Text style={[styles.label, { color: colors.text }]}>Question</Text>
                        <TextInput style={[styles.input, styles.multiline, { color: colors.text, backgroundColor: colors.surfaceLight, borderColor: colors.border }]}
                            value={formQuestion} onChangeText={setFormQuestion} multiline placeholder="Enter question..." placeholderTextColor={colors.textMuted} />

                        {formOptions.map((opt, i) => (
                            <View key={i}>
                                <View style={styles.optionRow}>
                                    <Text style={[styles.label, { color: colors.text }]}>Option {i + 1}</Text>
                                    <TouchableOpacity onPress={() => setFormCorrectAnswer(i)}>
                                        <Ionicons name={formCorrectAnswer === i ? 'checkmark-circle' : 'ellipse-outline'}
                                            size={22} color={formCorrectAnswer === i ? colors.primary : colors.textMuted} />
                                    </TouchableOpacity>
                                </View>
                                <TextInput style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceLight, borderColor: colors.border }]}
                                    value={opt} onChangeText={(v) => updateOption(i, v)} placeholder={`Option ${i + 1}`} placeholderTextColor={colors.textMuted} />
                            </View>
                        ))}

                        <Text style={[styles.label, { color: colors.text }]}>Explanation</Text>
                        <TextInput style={[styles.input, styles.multiline, { color: colors.text, backgroundColor: colors.surfaceLight, borderColor: colors.border }]}
                            value={formExplanation} onChangeText={setFormExplanation} multiline placeholder="Explain the answer..." placeholderTextColor={colors.textMuted} />

                        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={saveNewQuestion} disabled={saving}>
                            {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save Question</Text>}
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </Modal>

            {/* Edit Question Modal */}
            <Modal visible={showEditModal} animationType="slide">
                <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setShowEditModal(false)}>
                                <Ionicons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>Edit Question</Text>
                            <View style={{ width: 24 }} />
                        </View>

                        <Text style={[styles.label, { color: colors.text }]}>Question</Text>
                        <TextInput style={[styles.input, styles.multiline, { color: colors.text, backgroundColor: colors.surfaceLight, borderColor: colors.border }]}
                            value={formQuestion} onChangeText={setFormQuestion} multiline placeholderTextColor={colors.textMuted} />

                        {formOptions.map((opt, i) => (
                            <View key={i}>
                                <View style={styles.optionRow}>
                                    <Text style={[styles.label, { color: colors.text }]}>Option {i + 1}</Text>
                                    <TouchableOpacity onPress={() => setFormCorrectAnswer(i)}>
                                        <Ionicons name={formCorrectAnswer === i ? 'checkmark-circle' : 'ellipse-outline'}
                                            size={22} color={formCorrectAnswer === i ? colors.primary : colors.textMuted} />
                                    </TouchableOpacity>
                                </View>
                                <TextInput style={[styles.input, { color: colors.text, backgroundColor: colors.surfaceLight, borderColor: colors.border }]}
                                    value={opt} onChangeText={(v) => updateOption(i, v)} placeholderTextColor={colors.textMuted} />
                            </View>
                        ))}

                        <Text style={[styles.label, { color: colors.text }]}>Explanation</Text>
                        <TextInput style={[styles.input, styles.multiline, { color: colors.text, backgroundColor: colors.surfaceLight, borderColor: colors.border }]}
                            value={formExplanation} onChangeText={setFormExplanation} multiline placeholderTextColor={colors.textMuted} />

                        <TouchableOpacity style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={saveEditQuestion} disabled={saving}>
                            {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Update Question</Text>}
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { padding: Spacing.lg },
    headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
    headerTitle: { fontSize: FontSize.xl, fontWeight: '800' },
    statsGrid: {
        flexDirection: 'row', justifyContent: 'space-around', padding: Spacing.lg,
        borderRadius: BorderRadius.lg, borderWidth: 1, marginBottom: Spacing.lg,
    },
    statItem: { alignItems: 'center' },
    statNum: { fontSize: FontSize.xxl, fontWeight: '800' },
    statLbl: { fontSize: FontSize.xs, marginTop: 2 },
    sectionTitle: { fontSize: FontSize.md, fontWeight: '700', marginBottom: Spacing.sm },
    filterRow: { marginBottom: Spacing.md },
    filterChip: {
        paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
        marginRight: 8, backgroundColor: 'rgba(128,128,128,0.1)',
    },
    filterText: { fontSize: FontSize.xs, fontWeight: '600', color: '#888' },
    addBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        padding: Spacing.md, borderRadius: BorderRadius.sm, gap: 8,
    },
    addBtnText: { color: '#fff', fontSize: FontSize.md, fontWeight: '700' },
    questionCard: {
        padding: Spacing.md, borderRadius: BorderRadius.sm, borderWidth: 1, marginBottom: Spacing.sm,
    },
    qHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    qBadges: { flexDirection: 'row', gap: 6 },
    qBadge: { fontSize: 10, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, overflow: 'hidden' },
    qActions: { flexDirection: 'row', gap: 10 },
    actionBtn: { padding: 4 },
    qText: { fontSize: FontSize.sm, fontWeight: '600', marginBottom: 4 },
    qAnswer: { fontSize: FontSize.xs },
    // Modal
    modalContent: { padding: Spacing.lg, paddingBottom: 60 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
    modalTitle: { fontSize: FontSize.lg, fontWeight: '800' },
    label: { fontSize: FontSize.sm, fontWeight: '600', marginBottom: 4, marginTop: Spacing.sm },
    input: {
        borderRadius: BorderRadius.sm, padding: Spacing.md, fontSize: FontSize.md,
        borderWidth: 1, marginBottom: Spacing.sm,
    },
    multiline: { minHeight: 80, textAlignVertical: 'top' },
    optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    saveBtn: {
        padding: Spacing.md, borderRadius: BorderRadius.sm, alignItems: 'center', marginTop: Spacing.lg,
    },
    saveBtnText: { color: '#fff', fontSize: FontSize.md, fontWeight: '700' },
});
