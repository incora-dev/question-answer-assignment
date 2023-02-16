import axios from 'axios';
import { QUESTIONS_URL } from './constants';
import { IQuestionsRequestData } from './types';

const QuestionsApi = {
  answerQuestion: (payload: IQuestionsRequestData) => axios.post(
    `${process.env.REACT_APP_API_URL}${QUESTIONS_URL}`,
    payload,
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    },
  ),
};

export default QuestionsApi;
