import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSessionRequestDto } from './dto/create-session.request.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}
  @Post('session')
  @UseGuards(jwtAuthGuard)
  async createSession(@Body() request: CreateSessionRequestDto) {
    return this.checkoutService.createSession(request.productId);
  }
}
