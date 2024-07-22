import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  HttpStatus,
  Body,
} from '@nestjs/common';
import {
  LocalAuthGuard,
  AuthService,
  JwtAuthGuard,
  BasicAuthGuard,
} from './auth';
import { User, UserWithoutId } from './users';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

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

  // @Post('api/auth/register')
  // async register(@Body() user: UserWithoutId) {
  //   const newUser = this.authService.validateUser(user.name, user.password);
  //   const token = this.authService.login(newUser, 'basic');
  //
  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'OK',
  //     data: {
  //       ...token,
  //     },
  //   };
  // }

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
}
