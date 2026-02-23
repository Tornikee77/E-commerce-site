import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateuserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UseInterceptors(NoFilesInterceptor)
  createUser(@Body() request: CreateuserDto) {
    return this.usersService.createUser(request);
  }
}
