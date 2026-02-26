import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import Stripe from 'stripe';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly stripe: Stripe,
    private readonly productService: ProductsService,
  ) {}

  async createSession(productId: number) {
    const product = await this.productService.getProduct(productId);
  }
}
