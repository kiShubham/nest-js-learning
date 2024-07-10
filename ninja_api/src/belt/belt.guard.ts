/* eslint-disable prettier/prettier */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return true;
    // const reqBody = context.switchToHttp().getRequest();
    const resBody = context.switchToHttp().getResponse();
    console.log(resBody);
    const check = true; // the check we are doing ,
    return check;
  }
}
