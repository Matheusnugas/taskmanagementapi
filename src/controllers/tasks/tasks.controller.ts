import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TasksService } from '../../services/tasks/tasks.service';
import { CreateTaskDto } from '../../dto/tasks/create-task.dto';
import { UpdateTaskDto } from '../../dto/tasks/update-task.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from '@prisma/client';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @ApiOperation({ summary: 'Get all tasks for a user' })
  @ApiResponse({ status: 200, description: 'Tasks successfully retrieved.' })
  @Get('user/:userId')
  async findAllForUser(@Param('userId') userId: string): Promise<Task[]> {
    return this.tasksService.findAllForUser(+userId);
  }

  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Task successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task | null> {
    return this.tasksService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task successfully updated.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(+id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(+id);
  }
}
