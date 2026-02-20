import { supabase } from '../constants/supabase';

export type UserProgress = {
    exam_type: string;
    subject_id: string;
    score: number;
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
                score: progress.score,
            })
            .select();

        if (error) throw error;
        return data;
    },

    async getLatestProgress() {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .order('completed_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async getSubjectStats(examType: string) {
        const { data, error } = await supabase
            .from('user_progress')
            .select('subject_id, score')
            .eq('exam_type', examType);

        if (error) throw error;
        return data;
    }
};
