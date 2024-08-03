import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { TasksController } from './controllers/tasks/tasks.controller';
import { UsersService } from './services/users/users.service';
import { TasksService } from './services/tasks/tasks.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController, TasksController],
  providers: [UsersService, TasksService, PrismaService],
})
export class AppModule {}
