import { IAskResponse } from 'types/inference-runner';
import { CircuitBreaker } from '../utils/circuit-breaker';
import { ChunkHolderService } from './chunk-holder';
import { InferenceRunnerService } from './inference-runner';

export class QuestionsService {
  private inferenceRunnerService: InferenceRunnerService;
  private chunkHolderService: ChunkHolderService;

  constructor() {
    this.inferenceRunnerService = new InferenceRunnerService();
    this.chunkHolderService = new ChunkHolderService();
  }

  async answerQuestion(question: string) {
    const askRequest = new CircuitBreaker<IAskResponse>(() => this.inferenceRunnerService.ask(question));

    const { chunks } = await askRequest.exec();
    const answers = [];

    for (const chunk of chunks) {
      if (chunk.confidence < 70) continue;

      const getChunkRequest = new CircuitBreaker<string>(() => this.chunkHolderService.getChunk(chunk.chunkId));
      const answer = await getChunkRequest.exec();

      answers.push({
        value: answer,
        confidence: chunk.confidence,
      });
    }

    return { answers };
  }
}