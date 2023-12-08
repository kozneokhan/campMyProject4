import express from 'express';
import { SERVER_PORT } from '../constants/app.constant.js';
import needSignin from './middlewares/need-signin.middleware.js';
import errorHandlingMiddleware from './middlewares/error-handler.middleware.js';
import { apiRouter } from './routers/index.js';

const app = express();

app.use(needSignin);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandlingMiddleware);

app.use('/api', [apiRouter]);

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});
