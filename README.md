# NestJS Quick Start Guide

# nest-js-learning

learning by net ninja YOUTUBE videos

## Installation

To install the NestJS CLI, run the following command:

```
npm i -g @nestjs/cli@latest
```

## Creating a New Project

With the NestJS CLI installed, you can create a new project by running:

```
nest new folder_name
```

This will create a new folder named `folder_name` with a full backend server setup. You just need to edit it as per your requirements.

## Running the Server

To start the server, check the `package.json` for scripts and run:

```
npm run start:dev
```

The main entry point for the application is `main.ts`.

## Project Structure

In NestJS, instead of creating separate folders for controllers, services, middleware, and routes as in Express.js, we use a module-based structure. Each module encapsulates related functionality and includes controllers, services, and providers (not the same as middleware).

### Generating a Module

To generate a module, you can create it manually or use the NestJS CLI:

```
nest generate module module_name
# or
nest g module module_name
```

Example:

```
nest g module ninjas
```

This will create a folder named `ninjas` containing `ninjas.module.ts`. The `app.module.ts` file will be updated with the new module import.

### Generating Controllers and Services

To generate a controller for the module:

```
nest g controller ninjas
```

To generate a service for the module:

```
nest g service ninjas
```

You can also generate resources (controllers, services, etc.) in one command:

```
nest g resource users
```

This command will prompt you to choose between REST and GraphQL and ask if you want to generate CRUD endpoints.

## Understanding Modules

In NestJS, a module is a class annotated with a `@Module()` decorator. Modules organize the application structure by grouping related components together.

### Example of a Basic Module

```typescript
import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

### Key Benefits of Using Modules

1. **Encapsulation**: Modules encapsulate related logic.
2. **Reusability**: Modules can be reused across different parts of the application.
3. **Dependency Management**: Modules manage dependencies clearly.
4. **Modularity**: Applications are easier to understand, develop, and maintain.

## Example Code

### Automatically Generated Files

**user.controller.ts**

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
```

**user.service.ts**

```typescript
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return "This action adds a new user";
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
```

## Data Transfer Objects (DTO)

In NestJS, a DTO defines the structure and validation rules for data transferred between different layers of an application.

**create-ninja.dto.ts**

```typescript
export class CreateNinjaDto {
  name: string;
  weapon: "stars" | "nunchuks";
}
```

**update-ninja.dto.ts**

```typescript
import { PartialType } from "@nestjs/mapped-types";
import { CreateNinjaDto } from "./create-ninja.dto";
export class UpdateNinjaDto extends PartialType(CreateNinjaDto) {}
```

## Controllers

Controllers handle incoming requests and return responses to the client.

**ninjas.controller.ts**

```typescript
import { Controller, Get, Post, Body, Param, Query, Put } from "@nestjs/common";
import { CreateNinjaDto } from "./dto/create-ninja.dto";
import { UpdateNinjaDto } from "./dto/update-ninja.dto";
import { NinjasService } from "./ninjas.service";

@Controller("ninjas")
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}

  @Get()
  getNinjas(@Query("weapon") weapon?: string) {
    return this.ninjaService.getNinjas(weapon);
  }

  @Get(":id/:firstName")
  getOneNinja(@Param("id") id: string, @Param("firstName") firstName: string) {
    return { id, firstName };
  }

  @Post()
  sendNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }

  @Put(":id")
  changeInNinja(
    @Param("id") id: string,
    @Body() updateNinjaDto: UpdateNinjaDto
  ) {
    return this.ninjaService.updateNinja(+id, updateNinjaDto);
  }
}
```

## Providers

Providers manage and inject dependencies. They typically contain business logic and are marked with the `@Injectable()` decorator.

**ninjas.service.ts**

```typescript
import { Injectable } from "@nestjs/common";

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: "ninjaA", weapon: "stars" },
    { id: 1, name: "ninjaB", weapon: "nunchuks" },
  ];

  getNinjas(weapon?: "stars" | "nunchuks") {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      id: this.ninjas.length,
      ...createNinjaDto,
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    const ninja = this.ninjas.find((n) => n.id === id);
    if (ninja) {
      Object.assign(ninja, updateNinjaDto);
    }
    return ninja;
  }
}
```

## Pipes

Pipes transform input data to the desired form or validate it.

Example of using `ParseIntPipe` to convert a string to a number:

```typescript
import { ParseIntPipe } from '@nestjs/common';

@Put(':id')
changeInNinja(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateNinjaDto: UpdateNinjaDto
) {
  return this.ninjaService.updateNinja(id, updateNinjaDto);
}
```

## Guards

Guards determine whether a request can proceed based on certain conditions.

**belt.guard.ts**

```typescript
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

## Validation

To add validation, use `class-validator` and `class-transformer`:

```
npm i class-validator class-transformer
```

**create-ninja.dto.ts**

```typescript
import { MinLength } from "class-validator";

export class CreateNinjaDto {
  @MinLength(3)
  name: string;

  weapon: "stars" | "nunchuks";
}
```

Use the `ValidationPipe` to validate incoming requests:

```typescript
import { ValidationPipe } from '@nestjs/common';

@Post()
sendNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
  return this.ninjaService.createNinja(createNinjaDto);
}
```
