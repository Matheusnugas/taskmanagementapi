import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../../services/tasks/tasks.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateTaskDto, TaskStatus } from '../../dto/tasks/create-task.dto';
import { UpdateTaskDto } from '../../dto/tasks/update-task.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    createTask: jest.fn(),
    findAllForUser: jest.fn(),
    findOne: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
  };

  const mockRequest = {
    user: {
      userId: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should throw ForbiddenException if user ID does not match', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '01/07/2025',
        status: TaskStatus.PENDING,
        userId: 2,
      };

      await expect(
        controller.create(createTaskDto, mockRequest),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '01/07/2025',
        status: TaskStatus.PENDING,
        userId: 1,
      };

      const task = {
        id: 1,
        ...createTaskDto,
        dueDate: '2025-07-01T00:00:00.000Z',
      };

      mockTasksService.createTask.mockReturnValue(task);

      expect(await controller.create(createTaskDto, mockRequest)).toEqual(task);
    });
  });

  describe('findAllForUser', () => {
    it('should throw ForbiddenException if user ID does not match', async () => {
      await expect(controller.findAllForUser('2', mockRequest)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should return all tasks for a user', async () => {
      const tasks = [
        {
          id: 1,
          title: 'Test Task',
          description: 'Test Description',
          dueDate: '2025-07-01T00:00:00.000Z',
          status: TaskStatus.PENDING,
          userId: 1,
        },
      ];

      mockTasksService.findAllForUser.mockReturnValue(tasks);

      expect(await controller.findAllForUser('1', mockRequest)).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should throw NotFoundException if task not found', async () => {
      mockTasksService.findOne.mockReturnValue(null);

      await expect(controller.findOne('1', mockRequest)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user ID does not match', async () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '2025-07-01T00:00:00.000Z',
        status: TaskStatus.PENDING,
        userId: 2,
      };

      mockTasksService.findOne.mockReturnValue(task);

      await expect(controller.findOne('1', mockRequest)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should return a task by ID', async () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '2025-07-01T00:00:00.000Z',
        status: TaskStatus.PENDING,
        userId: 1,
      };

      mockTasksService.findOne.mockReturnValue(task);

      expect(await controller.findOne('1', mockRequest)).toEqual(task);
    });
  });

  describe('update', () => {
    it('should throw NotFoundException if task not found', async () => {
      mockTasksService.findOne.mockReturnValue(null);

      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
        dueDate: '02/07/2025',
        status: TaskStatus.IN_PROGRESS,
      };

      await expect(
        controller.update('1', updateTaskDto, mockRequest),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user ID does not match', async () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '01/07/2025',
        status: TaskStatus.PENDING,
        userId: 2,
      };

      mockTasksService.findOne.mockReturnValue(task);

      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
        dueDate: '02/07/2025',
        status: TaskStatus.IN_PROGRESS,
      };

      await expect(
        controller.update('1', updateTaskDto, mockRequest),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should update a task', async () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '01/07/2025',
        status: TaskStatus.PENDING,
        userId: 1,
      };

      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        description: 'Updated Description',
        dueDate: '02/07/2025',
        status: TaskStatus.IN_PROGRESS,
      };

      const updatedTask = {
        ...task,
        ...updateTaskDto,
        dueDate: '2025-07-02T00:00:00.000Z',
      };

      mockTasksService.findOne.mockReturnValue(task);
      mockTasksService.updateTask.mockReturnValue(updatedTask);

      expect(await controller.update('1', updateTaskDto, mockRequest)).toEqual(
        updatedTask,
      );
    });
  });

  describe('remove', () => {
    it('should throw NotFoundException if task not found', async () => {
      mockTasksService.findOne.mockReturnValue(null);

      await expect(controller.remove('1', mockRequest)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw ForbiddenException if user ID does not match', async () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '01/07/2025',
        status: TaskStatus.PENDING,
        userId: 2,
      };

      mockTasksService.findOne.mockReturnValue(task);

      await expect(controller.remove('1', mockRequest)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should delete a task', async () => {
      const task = {
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '01/07/2025',
        status: TaskStatus.PENDING,
        userId: 1,
      };

      mockTasksService.findOne.mockReturnValue(task);
      mockTasksService.deleteTask.mockReturnValue(task);

      expect(await controller.remove('1', mockRequest)).toEqual(task);
    });
  });
});
