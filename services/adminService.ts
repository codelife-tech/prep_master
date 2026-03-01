import { supabase } from '../constants/supabase';

export const adminService = {
    // Check if the current user is an admin
    async isAdmin(): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { data, error } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single();

        if (error || !data) return false;
        return data.is_admin === true;
    },

    // ==================== QUESTIONS ====================
    async addQuestion(subjectSlug: string, year: number, question: {
        slug: string;
        question: string;
        options: string[];
        correct_answer: number;
        explanation: string;
    }) {
        // Get subject DB id
        const { data: subject } = await supabase
            .from('subjects')
            .select('id')
            .eq('slug', subjectSlug)
            .single();

        if (!subject) throw new Error('Subject not found');

        const { data, error } = await supabase
            .from('questions')
            .insert({
                subject_id: subject.id,
                year,
                slug: question.slug,
                question: question.question,
                options: question.options,
                correct_answer: question.correct_answer,
                explanation: question.explanation,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async updateQuestion(questionId: string, updates: {
        question?: string;
        options?: string[];
        correct_answer?: number;
        explanation?: string;
    }) {
        const { data, error } = await supabase
            .from('questions')
            .update(updates)
            .eq('id', questionId)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deleteQuestion(questionId: string) {
        const { error } = await supabase
            .from('questions')
            .delete()
            .eq('id', questionId);

        if (error) throw error;
    },

    // ==================== SUBJECTS ====================
    async addSubject(examType: string, subject: {
        slug: string;
        name: string;
        icon: string;
    }) {
        const { data: exam } = await supabase
            .from('exams')
            .select('id')
            .eq('type', examType)
            .single();

        if (!exam) throw new Error('Exam not found');

        const { data, error } = await supabase
            .from('subjects')
            .insert({
                exam_id: exam.id,
                slug: subject.slug,
                name: subject.name,
                icon: subject.icon,
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async deleteSubject(subjectId: string) {
        const { error } = await supabase
            .from('subjects')
            .delete()
            .eq('id', subjectId);

        if (error) throw error;
    },

    // ==================== STATS ====================
    async getStats() {
        const [exams, subjects, questions, users] = await Promise.all([
            supabase.from('exams').select('*', { count: 'exact', head: true }),
            supabase.from('subjects').select('*', { count: 'exact', head: true }),
            supabase.from('questions').select('*', { count: 'exact', head: true }),
            supabase.from('profiles').select('*', { count: 'exact', head: true }),
        ]);

        return {
            totalExams: exams.count || 0,
            totalSubjects: subjects.count || 0,
            totalQuestions: questions.count || 0,
            totalUsers: users.count || 0,
        };
    },

    // Fetch all questions for admin view
    async getAllQuestions(subjectSlug?: string, year?: number) {
        let query = supabase
            .from('questions')
            .select('*, subjects!inner(slug, name, exams(type))')
            .order('year', { ascending: false });

        if (subjectSlug) {
            query = query.eq('subjects.slug', subjectSlug);
        }
        if (year) {
            query = query.eq('year', year);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data || [];
    },

    // Fetch all subjects for admin view
    async getAllSubjects() {
        const { data, error } = await supabase
            .from('subjects')
            .select('*, exams(type)')
            .order('name');

        if (error) throw error;
        return data || [];
    },
};
