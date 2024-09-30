import { useDispatch, useSelector } from 'react-redux';
import styles from './Result.module.scss';
import { resetFlow, selectAnswers } from '@/redux/slices/userDataSlice';
import { excludeAnswers } from '@/configs/flows';
import { Pages } from '@/enums/pagesEnus';
import Button from '../Button';
import ConfettiAnimation from '../Confetti';
import { useCallback, useMemo } from 'react';
import { getStepDataByPage } from '@/helpers/getStepDataByPage';
import { evalQuestion } from '@/helpers/evalQuestion';

type Props = {
  // Just some hardcode for hamster
  showHamster?: boolean;
  headLineText: string;
};

const Result: React.FC<Props> = ({ showHamster, headLineText }: Props) => {
  const dispatch = useDispatch();
  const answersData = useSelector(selectAnswers);

  const answersToDisplay = useMemo(
    () => answersData.filter(el => !excludeAnswers.includes(el.page)),
    [answersData, excludeAnswers]
  );

  const findQuestionByPage = useCallback(
    (page: Pages) => {
      return evalQuestion(getStepDataByPage(page)?.step || '', answersData);
    },
    [answersData]
  );

  return (
    <div className={styles.box}>
      <div className={styles.animation}>
        <ConfettiAnimation />
      </div>
      <h2>{headLineText}</h2>

      {showHamster ? (
        <img src="/images/hamster.png" alt="hamster" />
      ) : (
        answersToDisplay.map(el => (
          <div key={el.page} className={styles.block}>
            <p>{findQuestionByPage(el.page)}</p>
            <p className={styles.answer}>{el.answer}</p>
          </div>
        ))
      )}
      <Button onClick={() => dispatch(resetFlow())} text="Back to start" />
    </div>
  );
};

export default Result;
