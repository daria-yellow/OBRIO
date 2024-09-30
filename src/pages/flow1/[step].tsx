import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { Pages } from '@/enums/pagesEnus';
import { getFlowDataByName } from '@/helpers/getFlowDataByName';
import { getStepDataByPage } from '@/helpers/getStepDataByPage';
import { StepDataType } from '@/types/StepDataType';
import Box from '@/components/Box';

interface StepPageProps {
  stepData: StepDataType;
}

export default function StepPage({ stepData }: StepPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <Box stepData={stepData} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const flowData = getFlowDataByName('flow1')?.steps;

  if (!flowData) {
    return {
      paths: [],
      fallback: true,
    };
  }

  const paths = Object.keys(flowData)
    .filter(step => step !== Pages.Result)
    .map(step => ({ params: { step } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPage = params?.step;

  const stepData = getStepDataByPage(currentPage as Pages);

  if (!stepData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stepData,
    },
  };
};
