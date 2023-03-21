import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { loginRequestBodySchema } from '../models/LoginRequestBody';
// import { validate } from 'class-validator';

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        loginRequestBodySchema.parse({ email, password });

        // const loginRequestBody = new LoginRequestBody();
        // loginRequestBody.email = body.email;
        // loginRequestBody.password = body.password;

        // const validations = await validate(loginRequestBody);

        // if (validations.length) {
        //   throw new BadRequestException(
        //     validations.reduce((acc, curr) => {
        //       return [...acc, ...Object.values(curr.constraints)];
        //     }, []),
        //   );
        // }

        next();
    }
}
