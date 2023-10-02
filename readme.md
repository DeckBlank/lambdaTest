# API Serverless TesteandoServerless

Esta es una API Serverless desarrollada utilizando el framework Serverless Framework. Permite realizar operaciones relacionadas con tokens y datos de tarjetas.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado Node.js y npm en tu sistema.

## Configuración

### Variables de entorno

Asegúrate de configurar las siguientes variables de entorno antes de desplegar la API:

- `KV_REST_API_URL`: URL de la API REST externa.
- `KV_REST_API_TOKEN`: Token de autenticación para la API REST externa.

Puedes configurar estas variables en el archivo `serverless.yml` en la sección `provider.environment`.

## Despliegue

Para desplegar la API en AWS Lambda, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Ejecuta el siguiente comando para instalar las dependencias:

   ```bash
   npm install
   ```
3. Despliega la API en AWS Lambda ejecutando:

   ```bash
   serverless deploy
   ```
## Endpoints

La API Serverless expone los siguientes endpoints:

- `/tokens` (Método: POST): Para obtener un token.
- `/card-data` (Método: POST): Para enviar datos de tarjetas.

## Ejemplo de configuración de Postman

### Endpoint /tokens
- Método: POST
- URL: http://localhost:3000/tokens
- Headers:
    - Authorization: Bearer pk_test_JvbWUqBwgAEAAYgA
    - Cuerpo (Raw JSON):
    
```json
{
    "card_number" : 4532015112830366,
    "email" :"deckblqnk@gmail.com",
    "cvv" : 101,
    "expiration_year" :"2024",
    "expiration_month" :"12"
}
```
## Endpoint /card-data
- Método: POST
- URL: http://localhost:3000/card-data
- Headers:
    - Authorization: Bearer pk_test_JvbWUqBwgAEAAYgA
    - Cuerpo (Raw JSON):
    
```json
{
    "token" : "{{token}}"
}
```