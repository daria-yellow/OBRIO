import { Pages } from '@/enums/pagesEnus';
import steps from '@/configs/steps.json';
import { StepDataType } from '@/types/StepDataType';

export const getStepDataByPage = (stepName: Pages | null): StepDataType =>
  steps.data.find(el => el.step === stepName) as StepDataType;
