import { Pages } from '@/enums/pagesEnus';
import { AnswersType } from '@/types/AnswersType';

export const getAnswerByPage = (
  page: Pages | null,
  answers: AnswersType[]
): string => answers.find(el => el.page === page)?.answer || '';
