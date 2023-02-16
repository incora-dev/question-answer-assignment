import axios from 'axios';
import { LOGIN_URL } from './constants';
import { ILoginRequestData } from './types';

const QuestionsApi = {
  login: (payload: ILoginRequestData) => axios.post(`${process.env.REACT_APP_API_URL}${LOGIN_URL}`, payload),
};

export default QuestionsApi;
