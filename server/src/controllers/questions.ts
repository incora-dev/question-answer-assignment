import {
  JsonController,
  UseBefore,
  Post,
  BodyParam,
} from 'routing-controllers';
import authMiddleware from '../middlewares/auth';
import { QuestionsService } from '../services/questions';

@UseBefore(authMiddleware)
@JsonController('/questions')
export class QuestionsController {
  private questionsService: QuestionsService;

  constructor() {
    this.questionsService = new QuestionsService();
  }

  @Post()
  async answerQuestion(
    @BodyParam('question') question: string,
  ) {
    return this.questionsService.answerQuestion(question);
  }
}
