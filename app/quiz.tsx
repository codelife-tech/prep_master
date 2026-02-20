import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '../constants/theme';
import { getYearData, getSubject } from '../data';
import QuizOption from '../components/QuizOption';
import ProgressBar from '../components/ProgressBar';

export default function QuizScreen() {
    const { exam, subject, year } = useLocalSearchParams<{ exam: string; subject: string; year: string }>();
    const router = useRouter();
    const yearNum = parseInt(year || '2022');
    const yearData = getYearData(exam || '', subject || '', yearNum);
    const subjectData = getSubject(exam || '', subject || '');

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [timer, setTimer] = useState(30);
    const [answers, setAnswers] = useState<{ selected: number; correct: number; isCorrect: boolean }[]>([]);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const questions = yearData?.questions || [];
    const currentQ = questions[currentIndex];

    useEffect(() => {
        if (finished || showResult) return;
        intervalRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    handleTimeUp();
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [currentIndex, finished, showResult]);

    const handleTimeUp = useCallback(() => {
        if (showResult) return;
        setShowResult(true);
        setAnswers((prev) => [...prev, { selected: -1, correct: currentQ.correctAnswer, isCorrect: false }]);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, [currentIndex, showResult]);

    const handleSelect = (index: number) => {
        if (showResult) return;
        setSelectedAnswer(index);
    };

    const handleConfirm = () => {
        if (selectedAnswer === null) return;
        const isCorrect = selectedAnswer === currentQ.correctAnswer;
        if (isCorrect) setScore((s) => s + 1);
        setShowResult(true);
        setAnswers((prev) => [...prev, { selected: selectedAnswer, correct: currentQ.correctAnswer, isCorrect }]);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((i) => i + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setTimer(30);
        } else {
            setFinished(true);
        }
    };

    if (!yearData || !subjectData) {
        return <View style={styles.container}><Text style={styles.errorText}>Quiz not available</Text></View>;
    }

    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : pct >= 40 ? '📚' : '💪';
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.resultContainer}>
                    <Text style={styles.resultEmoji}>{emoji}</Text>
                    <Text style={styles.resultTitle}>Quiz Complete!</Text>
                    <Text style={styles.resultSubject}>{subjectData.name} · {yearNum}</Text>

                    <View style={styles.scoreCard}>
                        <Text style={styles.scoreNumber}>{score}/{questions.length}</Text>
                        <Text style={styles.scorePercent}>{pct}%</Text>
                        <ProgressBar progress={pct / 100} height={8} color={pct >= 60 ? Colors.primary : Colors.error} />
                    </View>

                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={[styles.statNum, { color: Colors.primary }]}>{score}</Text>
                            <Text style={styles.statLbl}>Correct</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={[styles.statNum, { color: Colors.error }]}>{questions.length - score}</Text>
                            <Text style={styles.statLbl}>Wrong</Text>
                        </View>
                    </View>

                    <Text style={styles.reviewTitle}>Review Answers</Text>
                    {questions.map((q, i) => (
                        <View key={q.id} style={[styles.reviewItem, answers[i]?.isCorrect ? styles.reviewCorrect : styles.reviewWrong]}>
                            <Text style={styles.reviewNum}>Q{i + 1}</Text>
                            <Text style={styles.reviewQuestion} numberOfLines={2}>{q.question}</Text>
                            <Text style={{ fontSize: 16 }}>{answers[i]?.isCorrect ? '✓' : '✗'}</Text>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.doneBtn} onPress={() => router.back()} activeOpacity={0.8}>
                        <Text style={styles.doneBtnText}>Done</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.qCounter}>Q {currentIndex + 1}/{questions.length}</Text>
                <View style={[styles.timerBadge, timer <= 10 && { backgroundColor: 'rgba(255,82,82,0.2)' }]}>
                    <Text style={[styles.timerText, timer <= 10 && { color: Colors.error }]}>⏱ {timer}s</Text>
                </View>
            </View>

            <ProgressBar progress={(currentIndex + 1) / questions.length} />

            <ScrollView contentContainerStyle={styles.qScroll} showsVerticalScrollIndicator={false}>
                <Text style={styles.questionText}>{currentQ.question}</Text>

                {currentQ.options.map((opt, i) => (
                    <QuizOption
                        key={i}
                        label={opt}
                        index={i}
                        selected={selectedAnswer === i}
                        isCorrect={i === currentQ.correctAnswer}
                        showResult={showResult}
                        onPress={() => handleSelect(i)}
                    />
                ))}

                {showResult && (
                    <View style={styles.explanationBox}>
                        <Text style={styles.expLabel}>💡 Explanation</Text>
                        <Text style={styles.expText}>{currentQ.explanation}</Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.bottomBar}>
                {!showResult ? (
                    <TouchableOpacity
                        style={[styles.confirmBtn, selectedAnswer === null && styles.btnDisabled]}
                        onPress={handleConfirm}
                        disabled={selectedAnswer === null}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.confirmText}>Confirm Answer</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.8}>
                        <Text style={styles.nextText}>
                            {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Spacing.md },
    qCounter: { fontSize: FontSize.md, fontWeight: '700', color: Colors.text },
    timerBadge: { backgroundColor: Colors.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: BorderRadius.full },
    timerText: { fontSize: FontSize.md, fontWeight: '700', color: Colors.accent },
    qScroll: { padding: Spacing.lg, paddingBottom: 100 },
    questionText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, lineHeight: 28, marginBottom: Spacing.xl, marginTop: Spacing.md },
    explanationBox: {
        marginTop: Spacing.md, backgroundColor: 'rgba(255,215,0,0.08)',
        borderRadius: BorderRadius.sm, padding: Spacing.md,
        borderLeftWidth: 3, borderLeftColor: Colors.accent,
    },
    expLabel: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.accent, marginBottom: 4 },
    expText: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
    bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.lg, backgroundColor: Colors.background },
    confirmBtn: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, alignItems: 'center' },
    btnDisabled: { backgroundColor: Colors.surfaceLight },
    confirmText: { fontSize: FontSize.lg, fontWeight: '700', color: '#fff' },
    nextBtn: { backgroundColor: Colors.accent, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, alignItems: 'center' },
    nextText: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.background },
    errorText: { color: Colors.error, fontSize: FontSize.md, textAlign: 'center', marginTop: 100 },
    // Results
    resultContainer: { padding: Spacing.lg, alignItems: 'center', paddingTop: Spacing.xxl },
    resultEmoji: { fontSize: 64, marginBottom: Spacing.md },
    resultTitle: { fontSize: FontSize.xxl, fontWeight: '900', color: Colors.text },
    resultSubject: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs, marginBottom: Spacing.xl },
    scoreCard: { backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.xl, width: '100%', alignItems: 'center', ...Shadow.md, marginBottom: Spacing.lg },
    scoreNumber: { fontSize: 48, fontWeight: '900', color: Colors.text },
    scorePercent: { fontSize: FontSize.lg, color: Colors.primary, fontWeight: '700', marginBottom: Spacing.md },
    statsRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.xl },
    statBox: { flex: 1, backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.lg, alignItems: 'center', ...Shadow.sm },
    statNum: { fontSize: FontSize.xxl, fontWeight: '800' },
    statLbl: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 4 },
    reviewTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.text, alignSelf: 'flex-start', marginBottom: Spacing.md },
    reviewItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: BorderRadius.sm, padding: Spacing.md, marginBottom: Spacing.sm, width: '100%', borderLeftWidth: 3 },
    reviewCorrect: { borderLeftColor: Colors.primary },
    reviewWrong: { borderLeftColor: Colors.error },
    reviewNum: { fontSize: FontSize.sm, fontWeight: '700', color: Colors.textSecondary, marginRight: Spacing.sm, width: 28 },
    reviewQuestion: { flex: 1, fontSize: FontSize.sm, color: Colors.text },
    doneBtn: { backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: Spacing.md, paddingHorizontal: Spacing.xxl, marginTop: Spacing.xl },
    doneBtnText: { fontSize: FontSize.lg, fontWeight: '700', color: '#fff' },
});
