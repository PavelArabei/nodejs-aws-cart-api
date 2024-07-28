import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserDbService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(id: string) {
    return await this.userRepo.findOneBy({ id });
  }

  async findOneByNameAndPassword(name: string, password: string) {
    return await this.userRepo.findOneBy({ name, password });
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async create(name: string, password: string) {
    const user = this.userRepo.create({ name, password });
    return await this.userRepo.save(user);
  }

  async remove(id: string) {
    return await this.userRepo.delete(id);
  }
}
