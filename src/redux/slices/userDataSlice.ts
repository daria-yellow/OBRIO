import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Pages } from '@/enums/pagesEnus';
import { ScreenTypesEnum } from '@/enums/screenTypesEnum';
import { getFlowDataByName } from '@/helpers/getFlowDataByName';
import { getStepDataByPage } from '@/helpers/getStepDataByPage';
import { StepDataType } from '@/types/StepDataType';
import { AnswersType } from '@/types/AnswersType';

export interface UserDataState {
  answers: Array<AnswersType>;
  currentPage: Pages | null;
  currentFlow: string | null;
  pagesStack: Array<Pages>;
  layoutStyle: ScreenTypesEnum | null;
}

const initialState: UserDataState = {
  answers: [],
  currentPage: null,
  currentFlow: null,
  pagesStack: [],
  layoutStyle: ScreenTypesEnum.Buttons,
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    addAnswer: (
      state,
      action: PayloadAction<{ page: Pages; answer: string }>
    ) => {
      state.answers = [
        ...state.answers,
        { page: action.payload.page, answer: action.payload.answer },
      ];
    },

    pageForward: (state, action: PayloadAction<number>) => {
      const flowData = getFlowDataByName(state.currentFlow || '')?.steps;

      if (!flowData || !state.currentPage) {
        resetFlow();
        return;
      }

      const nextPage = flowData[state.currentPage];
      const stepData = getStepDataByPage(state.currentPage) as StepDataType;

      if (!nextPage) {
        resetFlow();
        return;
      }

      if (stepData.forwardAnswer) {
        const forwardedAnswer = state.answers.find(
          el => el.page === stepData?.forwardAnswer
        )?.answer;
        const forwardedData = getStepDataByPage(stepData?.forwardAnswer);

        if (forwardedAnswer && Array.isArray(nextPage)) {
          const answerIndex =
            forwardedData?.answers.indexOf(forwardedAnswer) || 0;
          state.currentPage = nextPage[answerIndex];
          state.pagesStack = [...state.pagesStack, state.currentPage];
          return;
        }
      }

      if (Array.isArray(nextPage)) {
        state.currentPage = nextPage[action.payload];
      } else {
        state.currentPage = nextPage;
      }
      state.pagesStack = [...state.pagesStack, state.currentPage];
    },

    pageBack: state => {
      if (state.pagesStack.length < 2) {
        resetFlow();
      } else {
        const lastPath = state.pagesStack[state.pagesStack.length - 2];
        const newStack = state.pagesStack.slice(0, state.pagesStack.length - 1);
        const newAnswers = state.answers.slice(0, state.answers.length - 1);
        state.currentPage = lastPath;
        state.pagesStack = newStack;
        state.answers = newAnswers;
      }
    },

    setCurrentFlow: (state, action: PayloadAction<string>) => {
      const flowData = getFlowDataByName(action.payload);
      if (flowData) {
        state.currentPage = flowData.firstPage;
        state.pagesStack = [state.currentPage];
        state.currentFlow = action.payload;
      }
    },

    resetFlow: state => {
      state.currentFlow = null;
      state.currentPage = null;
      state.answers = [];
      state.pagesStack = [];
      setLayoutStyle(null);
    },

    setLayoutStyle: (state, action: PayloadAction<ScreenTypesEnum | null>) => {
      state.layoutStyle = action.payload;
    },
  },
});

export const {
  addAnswer,
  pageBack,
  pageForward,
  setCurrentFlow,
  resetFlow,
  setLayoutStyle,
} = userDataSlice.actions;

export const selectAnswers = (state: RootState) => state.userData.answers;
export const selectCurrentPage = (state: RootState) =>
  state.userData.currentPage;
export const selectCurrentFlow = (state: RootState) =>
  state.userData.currentFlow;
export const selectLayoutStyle = (state: RootState) =>
  state.userData.layoutStyle;

export default userDataSlice.reducer;
