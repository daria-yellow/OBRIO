import { flows } from '@/configs/flows';
import { FlowType } from '@/types/FlowType';

export const getFlowDataByName = (flowName: string): FlowType | undefined =>
  flows.find(el => el.flow === flowName);
