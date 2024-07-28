import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService, BasicAuthGuard } from './auth';
import { UserWithoutId } from './users';
import { GetAllService } from './getAll.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private getAllService: GetAllService,
  ) {}

  @Get(['', 'ping'])
  healthCheck(): any {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @UseGuards(BasicAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    const token = this.authService.login(req.user, 'basic');

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        ...token,
      },
    };
  }

  @Post('api/auth/register')
  async register(@Body() user: UserWithoutId) {
    const newUser = await this.authService.validateUser(
      user.name,
      user.password,
    );
    const token = this.authService.login(newUser, 'basic');

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        ...token,
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        user: req.user,
      },
    };
  }

  @Get('all-orders')
  async getAllOrders() {
    return await this.getAllService.getAllOrders();
  }

  @Get('all-carts')
  async getAllCarts() {
    return await this.getAllService.getAllCarts();
  }

  @Get('all-users')
  async getAllUsers() {
    return await this.getAllService.getAllUsers();
  }

  @Get('all-cart-items')
  async getAllCartItems() {
    return await this.getAllService.getAllCartItems();
  }
}
