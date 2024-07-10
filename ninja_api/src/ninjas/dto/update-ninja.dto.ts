/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateNinjaDto } from './create-ninja.dto';

export class UpdateNinjaDto extends PartialType(CreateNinjaDto) {}

/* 
? Partial Type is fundamental to nest and in Ts : partial
*/
