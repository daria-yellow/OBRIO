import { getStepDataByPage } from './getStepDataByPage';
import { Pages } from '@/enums/pagesEnus';
import { DynamicAnswerTypeEnum } from '@/enums/dynamicAnswerTypeEnum';
import { getAnswerByPage } from './getAnswerByPage';
import { StepDataType } from '@/types/StepDataType';
import { AnswersType } from '@/types/AnswersType';

export const evalQuestion = (page: Pages, answers: AnswersType[]): string => {
  if (!page) {
    return '';
  }

  const stepData = getStepDataByPage(page) as StepDataType;
  let newQuestion = stepData?.question || '';

  if (!stepData || !stepData.dynamicValues) {
    return newQuestion;
  }

  for (const val in stepData.dynamicValues) {
    const dynamicValue = stepData.dynamicValues[val];

    switch (dynamicValue.type) {
      case DynamicAnswerTypeEnum.Answer:
        const answer = evaluateByAnswer(dynamicValue.from, answers);
        newQuestion = newQuestion.replaceAll(`{{${val}}}`, answer);
        break;
      case DynamicAnswerTypeEnum.Condition:
        const isConditionTrue = evaluateByCondition(
          dynamicValue.from,
          answers,
          dynamicValue.value
        );
        newQuestion = newQuestion.replaceAll(
          `{{${val}}}`,
          isConditionTrue ? dynamicValue.trueText : dynamicValue.falseText
        );
        break;
      default:
        break;
    }
  }

  return newQuestion;
};

const evaluateByAnswer = (page: Pages | null, answers: AnswersType[]) => {
  return getAnswerByPage(page, answers);
};

const evaluateByCondition = (
  page: Pages | null,
  answers: AnswersType[],
  valueToCompare: string
) => {
  const answer = getAnswerByPage(page, answers);

  return answer === valueToCompare;
};
