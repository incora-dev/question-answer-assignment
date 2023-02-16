import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { BadRequestError } from 'routing-controllers';

export class AuthService {
  // Provides login functionality by values in .env
  async login(username: string, password: string) {
    if (!username || !password) {
        throw new BadRequestError('Username and password required');
    }

    if (await bcrypt.compare(password, process.env.ENCRYPTED_PASSWORD)) {
      const token = jwt.sign({ username }, process.env.TOKEN_KEY, { expiresIn: '1h' });

      return { token };
    }

    throw new BadRequestError('Invalid Credentials');
  }
}