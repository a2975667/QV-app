import { Question } from './question';
export interface Questionnaire {
    setting: {
        style: 'binary' | 'knapsack';
        totalCredits: number;
        progressBar: boolean;
        reset: boolean;
    };
    question_list: Array<Question>;
    reset: boolean;
    currentQuestion: number;
}
