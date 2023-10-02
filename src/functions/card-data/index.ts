import { APIGatewayProxyEvent, Handler } from "aws-lambda";

import { Function } from "..";
import { decodePkBearer } from "../../authorizations/pk";
import { Token } from "../../core/Token";
import { CardDataBody } from "./interfaces";
import { validateParams } from "./validations";

export const handler: Handler = Function.endpoint(
  async (event: APIGatewayProxyEvent) => {
    const headers: any = event.headers;
    decodePkBearer(headers);
    const { token }: CardDataBody = validateParams(event.body || "");
    const data = await Token.read(token);
    return {
      message: "Datos de la tarjeta recuperados exitosamente.",
      data,
    };
  }
);
