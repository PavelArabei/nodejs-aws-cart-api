import { Injectable } from '@nestjs/common';

import { DbService } from '../../db/db.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  async findOne(userName: string, password: string): Promise<User> {
    return this.db.users.findOneByNameAndPassword(userName, password);
  }

  async createOne(name: string, password: string): Promise<User> {
    return await this.db.users.create(name, password);
  }
}
