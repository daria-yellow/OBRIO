import styles from './MainLayout.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentFlow,
  selectCurrentPage,
  selectLayoutStyle,
} from '@/redux/slices/userDataSlice';
import Header from '@/components/Header';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const router = useRouter();
  const flow = useSelector(selectCurrentFlow);
  const page = useSelector(selectCurrentPage);
  const layoutStype = useSelector(selectLayoutStyle);

  useEffect(() => {
    if (flow && router.pathname !== `/${flow}/${page}`) {
      router.push(`/${flow}/${page}`);
    }
    if (!flow) {
      router.push('/');
    }
  }, [page, flow, router.pathname]);

  return (
    <div className={`${styles.layout} ${layoutStype && styles[layoutStype]}`}>
      <Header />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default MainLayout;
