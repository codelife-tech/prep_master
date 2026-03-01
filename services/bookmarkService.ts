import { supabase } from '../constants/supabase';
import { questionService } from './questionService';

export interface BookmarkedQuestion {
    id: string;
    question_id: string;
    question_slug: string;
    question_text: string;
    subject_name: string;
    year: number;
    created_at: string;
}

export const bookmarkService = {
    // Toggle bookmark (add if not exists, remove if exists)
    async toggleBookmark(questionSlug: string): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Get the DB id for this question
        const questionDbId = await questionService.getQuestionDbId(questionSlug);
        if (!questionDbId) throw new Error('Question not found');

        // Check if already bookmarked
        const { data: existing } = await supabase
            .from('bookmarks')
            .select('id')
            .eq('user_id', user.id)
            .eq('question_id', questionDbId)
            .single();

        if (existing) {
            // Remove bookmark
            await supabase
                .from('bookmarks')
                .delete()
                .eq('id', existing.id);
            return false; // now un-bookmarked
        } else {
            // Add bookmark
            await supabase
                .from('bookmarks')
                .insert({ user_id: user.id, question_id: questionDbId });
            return true; // now bookmarked
        }
    },

    // Check if a question is bookmarked
    async isBookmarked(questionSlug: string): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const questionDbId = await questionService.getQuestionDbId(questionSlug);
        if (!questionDbId) return false;

        const { data } = await supabase
            .from('bookmarks')
            .select('id')
            .eq('user_id', user.id)
            .eq('question_id', questionDbId)
            .single();

        return !!data;
    },

    // Get all bookmarks for the current user
    async getBookmarks(): Promise<BookmarkedQuestion[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('bookmarks')
            .select(`
                id,
                question_id,
                created_at,
                questions (
                    slug,
                    question,
                    year,
                    subjects (
                        name
                    )
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error || !data) return [];

        return data.map((b: any) => ({
            id: b.id,
            question_id: b.question_id,
            question_slug: b.questions.slug,
            question_text: b.questions.question,
            subject_name: b.questions.subjects.name,
            year: b.questions.year,
            created_at: b.created_at,
        }));
    },
};
