const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0'});

const options = {
    info: {
        title: '준커의 UMC 정복기',
        description: 'UMC 팀장의 힘을 보여주자!',
    },
    servers: [
        {
            url: 'http://localhost:3001',
        },
    ],
    schemas: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            in: 'header',
            bearerFormat: 'JWT',
        },
    },
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['../routes/*.js'];
swaggerAutogen(outputFile, endpointsFiles, options);