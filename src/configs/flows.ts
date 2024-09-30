import { Pages } from '@/enums/pagesEnus';
import { FlowType } from '@/types/FlowType';

const flow1: FlowType = {
  flow: 'flow1',
  firstPage: Pages.Gender,
  steps: {
    [Pages.Gender]: Pages.Relationship,
    [Pages.Relationship]: [Pages.SingleParent, Pages.Parent],
    [Pages.SingleParent]: Pages.SingleProblem,
    [Pages.Parent]: Pages.RelationshipProblem,
    [Pages.RelationshipProblem]: Pages.IntrovetExtrovert,
    [Pages.Overthink]: Pages.HowItWorks,
    [Pages.HowItWorks]: [Pages.ImportantTraits, Pages.EmotionalControl],
    [Pages.ImportantTraits]: Pages.AboutUs,
    [Pages.EmotionalControl]: Pages.AboutUs,
    [Pages.AboutUs]: Pages.Result,
    [Pages.Result]: null,
    [Pages.SingleProblem]: Pages.Overthink,
    [Pages.IntrovetExtrovert]: Pages.PartnerGender,
    [Pages.PartnerGender]: Pages.PartnerPriority,
    [Pages.PartnerPriority]: Pages.RelationshipGoals,
    [Pages.RelationshipGoals]: Pages.AboutUs,
  },
};

const flowFancy: FlowType = {
  flow: 'flowFancy',
  firstPage: Pages.Fancy,
  steps: {
    [Pages.Fancy]: Pages.Result,
    [Pages.Result]: null,
  },
};

export const excludeAnswers: Array<Pages> = [Pages.HowItWorks];

export const flows: Array<FlowType> = [flow1, flowFancy];
