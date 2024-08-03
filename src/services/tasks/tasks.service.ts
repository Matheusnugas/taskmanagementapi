import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from '../../dto/tasks/create-task.dto';
import { UpdateTaskDto } from '../../dto/tasks/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async findAllForUser(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async findOne(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
