import { APIGatewayProxyEvent, Handler } from 'aws-lambda';

import { Function } from '..';
import { decodePkBearer } from '../../authorizations/pk';
import { Token } from '../../core/Token';
import { TokensBody } from './interfaces';
import { validateParams } from './validations';

export const handler: Handler = Function.endpoint(
  async (event: APIGatewayProxyEvent) => {
    const headers: any = event.headers;
    const body: string = event.body || '';
    return await tokenController(body, headers);
  },
);

export const tokenController = async (body: any, headers: any) => {
  decodePkBearer(headers);
  const { email, card_number, expiration_year, expiration_month }: TokensBody =
    validateParams(body);
  const token = Token.generateToken(16);
  const data = JSON.stringify({
    email,
    card_number,
    expiration_year,
    expiration_month,
  });
  await Token.save({ token, data, expiration: 900 });
  return {
    message: 'Token identificador de tarjeta.',
    data: {
      token,
    },
  };
};
