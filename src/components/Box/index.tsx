import { ScreenTypesEnum } from '@/enums/screenTypesEnum';
import AdvBox from '../AdvBox';
import ContentBox from '../ContentBox';
import { StepDataType } from '@/types/StepDataType';

type Props = {
  stepData: StepDataType;
};

const Box: React.FC<Props> = ({ stepData }: Props) => {
  switch (stepData.screenType) {
    /// can add more cases
    case ScreenTypesEnum.Advert:
      return <AdvBox stepData={stepData} />;
    case ScreenTypesEnum.Buttons:
    default:
      return <ContentBox stepData={stepData} />;
  }
};

export default Box;
