import 'reflect-metadata';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Express } from 'express';
import { useExpressServer } from 'routing-controllers';

import { QuestionsController } from './controllers/questions';
import { AuthController } from './controllers/auth';

dotenv.config();

let app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app = useExpressServer(app, {
  controllers: [
    QuestionsController,
    AuthController,
  ],
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});