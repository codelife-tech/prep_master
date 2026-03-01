import { supabase } from '../constants/supabase';
import { ExamData, Subject, Question, YearData } from '../types';
import { exams as localExams, getExam as getLocalExam, getSubject as getLocalSubject, getYearData as getLocalYearData } from '../data';

// Types matching Supabase schema
export interface DbExam {
    id: string;
    type: string;
    description: string;
}

export interface DbSubject {
    id: string;
    exam_id: string;
    slug: string;
    name: string;
    icon: string;
}

export interface DbQuestion {
    id: string;
    subject_id: string;
    year: number;
    slug: string;
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
}

export const questionService = {
    // Fetch all exams
    async fetchExams(): Promise<ExamData[]> {
        try {
            const { data: dbExams, error } = await supabase
                .from('exams')
                .select('*')
                .order('type');

            if (error || !dbExams?.length) {
                console.log('Falling back to local exams data');
                return localExams;
            }

            // For each exam, fetch its subjects and questions
            const examsWithData: ExamData[] = await Promise.all(
                dbExams.map(async (exam: DbExam) => {
                    const subjects = await this.fetchSubjects(exam.type);
                    return {
                        type: exam.type as ExamData['type'],
                        description: exam.description,
                        subjects,
                    };
                })
            );

            return examsWithData;
        } catch (err) {
            console.error('Error fetching exams:', err);
            return localExams;
        }
    },

    // Fetch subjects for an exam type
    async fetchSubjects(examType: string): Promise<Subject[]> {
        try {
            const { data: dbSubjects, error } = await supabase
                .from('subjects')
                .select('*, exams!inner(type)')
                .eq('exams.type', examType)
                .order('name');

            if (error || !dbSubjects?.length) {
                const localExam = getLocalExam(examType);
                return localExam?.subjects || [];
            }

            // For each subject, fetch its questions grouped by year
            const subjects: Subject[] = await Promise.all(
                dbSubjects.map(async (sub: any) => {
                    const years = await this.fetchYears(sub.id);
                    return {
                        id: sub.slug,
                        name: sub.name,
                        icon: sub.icon,
                        years,
                    };
                })
            );

            return subjects;
        } catch (err) {
            console.error('Error fetching subjects:', err);
            const localExam = getLocalExam(examType);
            return localExam?.subjects || [];
        }
    },

    // Fetch available years for a subject
    async fetchYears(subjectDbId: string): Promise<YearData[]> {
        try {
            const { data: questions, error } = await supabase
                .from('questions')
                .select('*')
                .eq('subject_id', subjectDbId)
                .order('year', { ascending: false });

            if (error || !questions?.length) {
                return [];
            }

            // Group questions by year
            const yearMap: Record<number, Question[]> = {};
            questions.forEach((q: DbQuestion) => {
                if (!yearMap[q.year]) yearMap[q.year] = [];
                yearMap[q.year].push({
                    id: q.slug,
                    question: q.question,
                    options: q.options,
                    correctAnswer: q.correct_answer,
                    explanation: q.explanation,
                });
            });

            return Object.entries(yearMap)
                .map(([year, qs]) => ({ year: parseInt(year), questions: qs }))
                .sort((a, b) => b.year - a.year);
        } catch (err) {
            console.error('Error fetching years:', err);
            return [];
        }
    },

    // Fetch questions for a specific subject and year (using slug)
    async fetchQuestions(subjectSlug: string, year: number): Promise<Question[]> {
        try {
            const { data: questions, error } = await supabase
                .from('questions')
                .select('*, subjects!inner(slug)')
                .eq('subjects.slug', subjectSlug)
                .eq('year', year);

            if (error || !questions?.length) {
                return [];
            }

            return questions.map((q: any) => ({
                id: q.slug,
                question: q.question,
                options: q.options,
                correctAnswer: q.correct_answer,
                explanation: q.explanation,
            }));
        } catch (err) {
            console.error('Error fetching questions:', err);
            return [];
        }
    },

    // Get subject DB id from slug (needed for some operations)
    async getSubjectDbId(subjectSlug: string): Promise<string | null> {
        try {
            const { data, error } = await supabase
                .from('subjects')
                .select('id')
                .eq('slug', subjectSlug)
                .single();

            if (error || !data) return null;
            return data.id;
        } catch {
            return null;
        }
    },

    // Get question DB id from slug
    async getQuestionDbId(questionSlug: string): Promise<string | null> {
        try {
            const { data, error } = await supabase
                .from('questions')
                .select('id')
                .eq('slug', questionSlug)
                .single();

            if (error || !data) return null;
            return data.id;
        } catch {
            return null;
        }
    },
};
