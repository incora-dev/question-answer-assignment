import {
  JsonController,
  Post,
  BodyParam,
} from 'routing-controllers';
import { AuthService } from '../services/auth';

@JsonController('/auth')
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  @Post('/login')
  async answerQuestion(
    @BodyParam('username') username: string,
    @BodyParam('password') password: string,
  ) {
    return this.authService.login(username, password);
  }
}
