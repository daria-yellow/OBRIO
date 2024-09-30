import { DynamicAnswerTypeEnum } from '@/enums/dynamicAnswerTypeEnum';
import { Pages } from '@/enums/pagesEnus';
import { ScreenTypesEnum } from '@/enums/screenTypesEnum';

type DynamicAnswer = {
  type: DynamicAnswerTypeEnum.Answer;
  from: Pages;
};

type DynamicCondition = {
  type: DynamicAnswerTypeEnum.Condition;
  from: Pages;
  value: string;
  trueText: string;
  falseText: string;
};

type DynamicValue = DynamicAnswer | DynamicCondition;

export type StepDataType = {
  step: Pages;
  question: string;
  answers: Array<string>;
  screenType?: ScreenTypesEnum;
  subQuestion?: string;
  forwardAnswer?: Pages;
  dynamicValues?: {
    [key: string]: DynamicValue;
  };
};
