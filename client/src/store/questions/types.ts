export interface IQuestionsState {
  answers: string[];
  loading: boolean;
  error: string | null;
}

export interface IQuestionsRequestData {
  question: string;
}

export interface IQuestionsPayload {
  answers: string[];
}
