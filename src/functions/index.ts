import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { functionResponseProp } from './interfaces';

export const Function = {
  endpoint:
    (
      callback: (event: APIGatewayProxyEvent) => Promise<functionResponseProp>,
    ) =>
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      try {
        const { message, data } = await callback(event);
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
          },
          body: JSON.stringify({
            message,
            data,
          }),
        };
      } catch (error: any) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
          },
          body: JSON.stringify({
            message: error.message,
          }),
        };
      }
    },
};
