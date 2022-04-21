import { handlerPath } from '@libs/handler-resolver';

export const createToken = {
    handler: `${handlerPath(__dirname)}/handlers.createToken`,
    events: [
        {
            http: {
                method: 'post',
                path: 'create-token',
            },
        },
    ],
};

export const checkUser = {
    handler: `${handlerPath(__dirname)}/handlers.checkUser`,
    events: [
        {
            http: {
                method: 'post',
                path: 'check-user',
            },
        },
    ],
};