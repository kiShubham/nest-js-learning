/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Put,
  Body,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}
  // GET /ninjas?weapon=fast  ;  --> [ ] ;

  @Get()
  getNinjas(@Query('weapon') weapon?: 'stars' | 'nunchuks') {
    /*  const service = new NinjasService();
    return service.getNinjas(weapon); */
    return this.ninjaService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> {...} ;

  @Get(':id')
  getOneNinja(@Param('id') id: string) {
    // return this.ninjaService.getNinjaById(id); // will give type error ,as from the server the id is a string , but in services we are taking it as a number so typecast it
    return this.ninjaService.getNinjaById(+id); //+id : will be a number ;typecast
  }

  /*  @Get(':id/:firstName')
  getOneNinja(@Param('id') id: number, @Param('firstName') firstName: string) {
    return {
      id,
      firstName,
    };
  }
 */

  //  POST /ninjas ;
  // so if we need to send some data to server , like login credentials , we need to parse the req.body
  // in nest we use '@Body createNinjsDto' , here the dto tells the structure of the object ;

  @Post()
  @UseGuards(BeltGuard)
  sendNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    try {
      return this.ninjaService.createNinja(createNinjaDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  // PUT /ninjas/:id --> { ... } ;

  @Put(':id')
  ChangeInNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto, //checking for the data coming from frontend body;
  ) {
    return this.ninjaService.updateNinja(id, updateNinjaDto);
  }

  @Delete(':id')
  removeNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjaService.removeNinja(id);
  }
}

//run time error
//compilation error

//marius espejo youtuber , and teached on netninja youtube channel
