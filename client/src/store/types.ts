import { ILoginState } from './login';
import { IQuestionsState } from './questions';

export interface IState {
  questions: IQuestionsState,
  login: ILoginState,
}
