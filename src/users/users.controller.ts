import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateuserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { TokenPayload } from 'src/auth/token-payload.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UseInterceptors(NoFilesInterceptor)
  createUser(@Body() request: CreateuserDto) {
    return this.usersService.createUser(request);
  }

  @Get('me')
  @UseGuards(jwtAuthGuard)
  getMe(@CurrentUser() user: TokenPayload) {
    return user;
  }
}
