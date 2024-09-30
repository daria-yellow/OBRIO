import { evalQuestion } from '@/helpers/evalQuestion';
import { selectAnswers, selectCurrentPage } from '@/redux/slices/userDataSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useEvaluatedQuestion = (question: string): string => {
  const page = useSelector(selectCurrentPage);
  const answersData = useSelector(selectAnswers);
  const [evaluatedQuestion, setEvaluetedQuestion] = useState(question);

  useEffect(() => {
    if (page) {
      setEvaluetedQuestion(evalQuestion(page, answersData));
    }
  }, [page, answersData]);

  return evaluatedQuestion;
};
