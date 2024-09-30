import Button from '@/components/Button';
import { setCurrentFlow } from '@/redux/slices/userDataSlice';
import { useDispatch } from 'react-redux';
import styles from './Home.module.scss';

export default function Home() {
  const dispatch = useDispatch();

  const handleStartFlow =
    (flow: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(setCurrentFlow(flow));
    };

  return (
    <div className={styles.box}>
      <Button onClick={handleStartFlow('flow1')} text="Start default flow" />
      <Button onClick={handleStartFlow('flowFancy')} text="Start fancy flow" />
    </div>
  );
}
