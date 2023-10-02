import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { functionResponseProp } from "./interfaces";

export const Function = {
  endpoint:
    (
      callback: (event: APIGatewayProxyEvent) => Promise<functionResponseProp>
    ) =>
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      try {
        const { message, data } = await callback(event);
        return {
          statusCode: 200,
          body: JSON.stringify({
            message,
            data,
          }),
        };
      } catch (error: any) {
        console.log(error);
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: error.message,
          }),
        };
      }
    },
};
