import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData, IQuestionsState } from '@store/questions';
import { IState } from '@store/types';

import './styles.scss';

const DOMPurify = require('dompurify')(window);

const QuestionsPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState<string>();
  const { answers, loading } = useSelector<IState, IQuestionsState>(({ questions }) => questions);

  const askQuestion = useCallback(() => {
    dispatch(getData({ question }));
  }, [question, dispatch]);

  return (
    <div className="question-container">
      <div className="question-box">
        <textarea
          value={question}
          onChange={event => setQuestion(event.target.value)}
        />
        <button onClick={askQuestion}>Search</button>
      </div>
      <div className="answers-list">
        {loading
          ? <div>Loading...</div>
          : answers.map((answer: any, index: number) => (
            <div key={index} className="answer">
              <div className="answer-content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer.value) }} />
              <div className="answer-confidence">Confidence: {answer.confidence.toFixed(2)}%</div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default QuestionsPage;
