import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto } from '../../dto/tasks/create-task.dto';
import { UpdateTaskDto } from '../../dto/tasks/update-task.dto';
import { Task } from '@prisma/client';
import * as moment from 'moment';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: CreateTaskDto): Promise<Task> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${data.userId} not found`);
    }

    const transformedData = {
      ...data,
      dueDate: moment(data.dueDate, 'DD/MM/YYYY').toISOString(),
    };

    return this.prisma.task.create({ data: transformedData });
  }

  async findAllForUser(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({ where: { userId } });
  }

  async findOne(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    const transformedData = data.dueDate
      ? {
          ...data,
          dueDate: moment(data.dueDate, 'DD/MM/YYYY').toISOString(),
        }
      : data;
    return this.prisma.task.update({ where: { id }, data: transformedData });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
