import { supabase } from '../constants/supabase';

export type UserProgress = {
    exam_type: string;
    subject_id: string;
    year: number;
    score: number;
    total_questions: number;
    correct_answers: number;
};

export type ProgressRecord = {
    id: string;
    exam_type: string;
    subject_id: string;
    year: number;
    score: number;
    total_questions: number;
    correct_answers: number;
    completed_at: string;
};

export const progressService = {
    async saveProgress(progress: UserProgress) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('user_progress')
            .insert({
                user_id: user.id,
                exam_type: progress.exam_type,
                subject_id: progress.subject_id,
                year: progress.year,
                score: progress.score,
                total_questions: progress.total_questions,
                correct_answers: progress.correct_answers,
            })
            .select();

        if (error) throw error;
        return data;
    },

    async getLatestProgress(): Promise<ProgressRecord[]> {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .order('completed_at', { ascending: false })
            .limit(20);

        if (error) throw error;
        return data || [];
    },

    async getSubjectStats(examType: string) {
        const { data, error } = await supabase
            .from('user_progress')
            .select('subject_id, score, total_questions, correct_answers, year')
            .eq('exam_type', examType);

        if (error) throw error;
        return data || [];
    },

    async getTotalQuizzesCompleted(): Promise<number> {
        const { count, error } = await supabase
            .from('user_progress')
            .select('*', { count: 'exact', head: true });

        if (error) return 0;
        return count || 0;
    },
};
