import styles from './ContentBox.module.scss';
import Button from '../Button';
import { useSelector } from 'react-redux';
import {
  addAnswer,
  pageForward,
  selectCurrentPage,
  setLayoutStyle,
} from '@/redux/slices/userDataSlice';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { ScreenTypesEnum } from '@/enums/screenTypesEnum';
import { useEvaluatedQuestion } from '@/hooks/useEvaluetedQuestion';
import { StepDataType } from '@/types/StepDataType';

type Props = {
  stepData: StepDataType;
};

const ContentBox: React.FC<Props> = ({ stepData }: Props) => {
  const { question, subQuestion, answers } = stepData;
  const dispatch = useDispatch();
  const page = useSelector(selectCurrentPage);
  const evalQuestion = useEvaluatedQuestion(question);

  const handleSelectOption = useCallback(
    (answer: string, id: number) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (page) {
          dispatch(addAnswer({ page, answer }));
          dispatch(pageForward(id));
        }
      },
    [page]
  );

  useEffect(() => {
    dispatch(setLayoutStyle(ScreenTypesEnum.Buttons));
  }, []);

  return (
    <div className={styles.box}>
      <h1>{evalQuestion}</h1>
      {subQuestion && <p className={styles.subQuestion}>{subQuestion}</p>}
      <div className={styles.answers}>
        {answers.map((answer: string, id: number) => (
          <Button
            onClick={handleSelectOption(answer, id)}
            key={answer}
            text={answer}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentBox;
