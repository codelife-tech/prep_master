import { ExamData } from '../types';
import { beceSubjects } from './bece-questions';
import { wassceSubjects } from './wassce-questions';

export const exams: ExamData[] = [
    {
        type: 'BECE',
        description: 'Basic Education Certificate Examination — JHS Level',
        subjects: beceSubjects,
    },
    {
        type: 'WASSCE',
        description: 'West African Senior School Certificate Examination — SHS Level',
        subjects: wassceSubjects,
    },
];

export function getExam(type: string) {
    return exams.find((e) => e.type === type);
}

export function getSubject(examType: string, subjectId: string) {
    const exam = getExam(examType);
    return exam?.subjects.find((s) => s.id === subjectId);
}

export function getYearData(examType: string, subjectId: string, year: number) {
    const subject = getSubject(examType, subjectId);
    return subject?.years.find((y) => y.year === year);
}
