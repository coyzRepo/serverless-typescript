import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from '@libs/lambda';
import userService from "../../service";
import User from "../../db/user";

export const createToken = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const privateKey = "b92ec406-bfef-11ec-9d64-0242ac120002" // can be any value
    const { username, password } = event.queryStringParameters;
    const dateCreated = Date.now();
    const token = userService.createToken(username, password, dateCreated, privateKey);

    const isSaved = await User.createUser(username, password, token);

    try {
        if (!isSaved || !token) {
            return {
                statusCode: 500,
                body: (!isSaved ? 'Database error when saving data' : 'Something went wrong'),
            };
        }
    
        return {
            statusCode: 200,
            body: JSON.stringify({token}),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: error
        };
    }    
})

export const checkUser = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    let statusCode = 500;
    let message = 'Something went wrong';

    try {
        const { username, token } = event.queryStringParameters;
        const privateKey = "b92ec406-bfef-11ec-9d64-0242ac120002";
        const tokenFromDb = await User.findTokenByUsername(username);
        
        if (!tokenFromDb || tokenFromDb !== token) {
            throw new Error('Invalid token!');
        }

        const isUserValid = userService.checkIsUserValid(username, token, privateKey);
        const isTokenValid = userService.checkIsTokenValid(token, privateKey);
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
