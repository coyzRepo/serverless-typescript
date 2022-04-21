import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import todosService from "../../service";

export const createToken = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const privateKey = "b92ec406-bfef-11ec-9d64-0242ac120002" // can be any value
    const { username, password } = event.queryStringParameters;
    const dateCreated = Date.now();
    const token = todosService.createToken(username, password, dateCreated, privateKey);

    if (token) {
        return formatJSONResponse({
            token
        });
    }
    
    return formatJSONResponse({
        status: 500,
        message: 'Something went wrong'
    });
})


export const checkUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let statusCode = 500;
    let message = 'Something went wrong';

    try {
        const { username, token } = event.queryStringParameters;
        const privateKey = "b92ec406-bfef-11ec-9d64-0242ac120002"

        const isUserValid = todosService.checkIsUserValid(username, token, privateKey);
        const isTokenValid = todosService.checkIsTokenValid(token, privateKey);
        statusCode = isUserValid && isTokenValid ? 200 : 403;
        message = isUserValid && isTokenValid ? 'Success!' : 'Failed: Unauthorized Access';
        
    } catch (error) {
        statusCode = 500;
        message = error.message;
    } finally {
        return {
            statusCode,
            body: JSON.stringify({ message }),
        };
    }
});