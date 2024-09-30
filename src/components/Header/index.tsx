import { useDispatch, useSelector } from 'react-redux';
import styles from './Header.module.scss';
import {
  pageBack,
  resetFlow,
  selectCurrentFlow,
  selectLayoutStyle,
} from '@/redux/slices/userDataSlice';
import Image from 'next/image';
import { ScreenTypesEnum } from '@/enums/screenTypesEnum';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const flow = useSelector(selectCurrentFlow);
  const layoutStype = useSelector(selectLayoutStyle);

  return (
    <header className={styles.header}>
      {flow && (
        <Image
          onClick={() => dispatch(pageBack())}
          src={`/images/svg/${layoutStype === ScreenTypesEnum.Advert ? 'white-back' : 'back'}.svg`}
          className={styles.navBack}
          width="24"
          height="24"
          alt="back"
        />
      )}
      <Image
        onClick={() => dispatch(resetFlow())}
        src={`/images/svg/${layoutStype === ScreenTypesEnum.Advert ? 'white-logo' : 'logo'}.svg`}
        width="15"
        height="16"
        alt="logo"
      />
    </header>
  );
};

export default Header;
