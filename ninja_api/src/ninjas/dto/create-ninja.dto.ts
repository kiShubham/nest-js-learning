/* eslint-disable prettier/prettier */
import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  @MinLength(3) // this is like a additional metadata to the class ;
  name: string;

  @IsEnum(['stars', 'nunchuks', 'flute'], { message: 'use correct weapon!' })
  weapon: 'stars' | 'nunchuks' | 'flute';
}
