import express, { Request, Response } from 'express';
import { ALLOWED, APP_ENV } from './enviroment';

import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { cardDataController } from './functions/card-data';
import { tokenController } from './functions/tokens';

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (ALLOWED === '*') return callback(null, true);
    if (
      (ALLOWED ? ALLOWED.split(',') : []).indexOf(origin) !== -1 ||
      origin === undefined
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
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
  try{
    res.json(await tokenController(JSON.stringify(body), headers));
  }
  catch(error:any){
    res.json({
      message:error.message
    });
  }
});
app.post('/card-data', async (req: Request, res: Response) => {
  const headers = req.headers;
  const body = req.body;
  try{
    res.json(await cardDataController(JSON.stringify(body), headers));
  }
  catch(error:any){
    res.json({
      message:error.message
    });
  }
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
