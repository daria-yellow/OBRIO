import { Pages } from '@/enums/pagesEnus';

type StepsType = { [key: string]: Pages | Array<Pages> | null };

export type FlowType = {
  flow: string;
  steps: StepsType;
  firstPage: Pages;
};
