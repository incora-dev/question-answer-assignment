import axios, { AxiosInstance, AxiosPromise } from 'axios';

export class InferenceRunnerService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.INFERENCE_RUNNER_URL,
      headers: {
        'X-API-Key': process.env.INFERENCE_RUNNER_API_KEY,
      }
    });
  }

  ask(question: string): AxiosPromise {
    return this.client.post('/ask', { question });
  }
}
