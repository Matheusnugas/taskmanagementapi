import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto, TaskStatus } from '../../dto/tasks/create-task.dto';
import { UpdateTaskDto } from '../../dto/tasks/update-task.dto';
import * as moment from 'moment';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, PrismaService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should throw NotFoundException if user is not found', async () => {
      prisma.user.findUnique = jest.fn().mockReturnValue(null);

      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '01/07/2025',
        status: TaskStatus.PENDING,
        userId: 1,
      };

      await expect(service.createTask(createTaskDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should create a task', async () => {
      const user = { id: 1, email: 'test@test.com', password: 'hashed' };
      prisma.user.findUnique = jest.fn().mockReturnValue(user);
      prisma.task.create = jest.fn().mockReturnValue({
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: moment('01/07/2025', 'DD/MM/YYYY').toISOString(),
        status: TaskStatus.PENDING,
        userId: 1,
      });

      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '01/07/2025',
        status: TaskStatus.PENDING,
        userId: 1,
      };

      expect(await service.createTask(createTaskDto)).toEqual({
        id: 1,
        ...createTaskDto,
        dueDate: moment(createTaskDto.dueDate, 'DD/MM/YYYY').toISOString(),
      });
    });
  });

  describe('findAllForUser', () => {
    it('should return all tasks for a user', async () => {
      const tasks = [
        {
          id: 1,
          title: 'Test Task',
          description: 'Test Description',
          dueDate: moment('01/07/2025', 'DD/MM/YYYY').toISOString(),
          status: TaskStatus.PENDING,
          userId: 1,
        },
      ];
      prisma.task.findMany = jest.fn().mockReturnValue(tasks);

      expect(await service.findAllForUser(1)).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return a task by ID', async () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: moment('01/07/2025', 'DD/MM/YYYY').toISOString(),
        status: TaskStatus.PENDING,
        userId: 1,
      };
      prisma.task.findUnique = jest.fn().mockReturnValue(task);

      expect(await service.findOne(1)).toEqual(task);
    });

    it('should return null if task not found', async () => {
      prisma.task.findUnique = jest.fn().mockReturnValue(null);

      expect(await service.findOne(1)).toBeNull();
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
        dueDate: '02/07/2025',
        status: TaskStatus.IN_PROGRESS,
      };

      const updatedTask = {
        id: 1,
        title: 'Updated Task',
        description: 'Updated Description',
        dueDate: moment(updateTaskDto.dueDate, 'DD/MM/YYYY').toISOString(),
        status: TaskStatus.IN_PROGRESS,
        userId: 1,
      };

      prisma.task.update = jest.fn().mockReturnValue(updatedTask);

      expect(await service.updateTask(1, updateTaskDto)).toEqual(updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: moment('01/07/2025', 'DD/MM/YYYY').toISOString(),
        status: TaskStatus.PENDING,
        userId: 1,
      };

      prisma.task.delete = jest.fn().mockReturnValue(task);

      expect(await service.deleteTask(1)).toEqual(task);
    });
  });
});
