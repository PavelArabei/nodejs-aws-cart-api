import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './services';
import { BasicAuthGuard } from '../auth';
import { OrderInputDto } from '../order/dto/order.dto';
import { UpdateCartItemDto } from './dto/updateCartItem.dto';
import { CartStatuses } from './models';

@Controller('profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  @UseGuards(BasicAuthGuard)
  @Get('all')
  async findAllCards(@Req() req: AppRequest) {
    const carts = await this.cartService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: carts,
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(
      getUserIdFromRequest(req),
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Put()
  updateUserCart(@Req() req: AppRequest, @Body() body: UpdateCartItemDto) {
    const cart = this.cartService.updateByUserId(
      getUserIdFromRequest(req),
      body,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    await this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() orderDto: OrderInputDto) {
    const userId = getUserIdFromRequest(req);

    const cart = await this.cartService.findByUserId(userId);
    if (!(cart && cart.items.length)) {
      const statusCode = HttpStatus.BAD_REQUEST;
      req.statusCode = statusCode;

      return {
        statusCode,
        message: 'Cart is empty',
      };
    }

    const { delivery } = orderDto;
    const order = await this.orderService.create({
      user_id: userId,
      cart_id: cart.id,
      delivery,
    });

    cart.status = CartStatuses.ORDERED;
    await this.cartService.update(cart);
    await this.cartService.removeAllCartsItems(cart.id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }
}
