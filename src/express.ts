import express, { Request, Response } from 'express';

import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { APP_ENV } from './enviroment';
import { cardDataController } from './functions/card-data';
import { tokenController } from './functions/tokens';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
  helmet({
    contentSecurityPolicy: APP_ENV === 'development' ? false : undefined,
    crossOriginEmbedderPolicy: APP_ENV === 'development' ? false : true,
  }),
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Exceso de solicitudes. Por favor, inténtalo de nuevo más tarde.',
  }),
);
app.use(express.static('public'));
app.get('/', (req: Request, res: Response) => {
  const title = 'JLGS';
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div>Hello world!</div>
      </body>
    </html>
  `;
  res.send(html);
});
app.post('/tokens', async (req: Request, res: Response) => {
  const headers = req.headers;
  const body = req.body;
  res.json(await tokenController(JSON.stringify(body), headers));
});
app.post('/card-data', async (req: Request, res: Response) => {
  const headers = req.headers;
  const body = req.body;
  res.json(await cardDataController(JSON.stringify(body), headers));
});

const httpServer = http.createServer(app);

if (APP_ENV === 'development') {
  app.listen(3001);
  console.log(`
 Enviroment: ${APP_ENV}
 Port: ${3001}
 Date: ${new Date()}`);
}

export default httpServer;
