import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductRequest } from './dto/create-product.dto';
import { TokenPayload } from 'src/auth/token-payload.interface';
import { CurrentUser } from 'src/auth/current-user.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @UseGuards(jwtAuthGuard)
  async createProduct(
    @Body() body: CreateProductRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.productsService.createProduct(body, user.userId);
  }

  @Get()
  @UseGuards(jwtAuthGuard)
  async getProducts() {
    return this.productsService.getProduct();
  }
}
