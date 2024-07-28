import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './services';
import { BasicAuthGuard } from '../auth';
import { AppRequest, getUserIdFromRequest } from '../shared';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserOrders(@Req() req: AppRequest) {
    return this.orderService.findAllOrdersByUserId(getUserIdFromRequest(req));
  }

  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  async deleteUserOrder(@Req() req: AppRequest, @Param('id') id: string) {
    this.orderService.deleteOrder(id);
  }
}
