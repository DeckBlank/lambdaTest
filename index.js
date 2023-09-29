exports.readProducto = async (event) => {
    if (event.httpMethod === 'GET' && event.resource === '/producto') {
      // Lógica para obtener todos los productos
      return {
        statusCode: 200,
        body: JSON.stringify({ productos: [...] }), // Aquí debes proporcionar la lista de productos
      };
    }
  
    if (event.httpMethod === 'GET' && event.resource === '/producto/{id}') {
      // Lógica para obtener un producto por ID (debes extraer el ID de la ruta)
      return {
        statusCode: 200,
        body: JSON.stringify({ producto: { id: event.pathParameters.id, ... } }), // Aquí debes proporcionar los detalles del producto
      };
    }
  
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Ruta no encontrada' }),
    };
  };

  import { APIGatewayEvent, APIGatewayProxyResult, Handler } from 'aws-lambda';

export const readProducto: Handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    if (event.httpMethod === 'GET' && event.resource === '/producto') {
        // Lógica para obtener todos los productos
        return {
            statusCode: 200,
            body: JSON.stringify({ productos: [] }), // Aquí debes proporcionar la lista de productos
        };
    }

    if (event.httpMethod === 'GET' && event.resource === '/producto/{id}') {
        // Lógica para obtener un producto por ID (debes extraer el ID de la ruta)
        return {
            statusCode: 200,
            body: JSON.stringify({ producto: { id: event.pathParameters?.id,  } }), // Aquí debes proporcionar los detalles del producto
        };
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Ruta no encontrada' }),
    };
};
