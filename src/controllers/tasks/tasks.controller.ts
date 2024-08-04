import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
  NotFoundException,
  Headers,
} from '@nestjs/common';
import { TasksService } from '../../services/tasks/tasks.service';
import { CreateTaskDto } from '../../dto/tasks/create-task.dto';
import { UpdateTaskDto } from '../../dto/tasks/update-task.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { Task } from '@prisma/client';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: any,
  ): Promise<Task> {
    console.log('Decoded User:', req.user);
    if (createTaskDto.userId !== req.user.userId) {
      throw new ForbiddenException(
        'You are not allowed to create a task for another user',
      );
    }

    return this.tasksService.createTask(createTaskDto);
  }

  @Get('user/:userId')
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'Authorization token',
  //   required: true,
  // })
  @ApiOperation({ summary: 'Get all tasks for a user' })
  @ApiResponse({ status: 200, description: 'Tasks successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAllForUser(
    @Param('userId') userId: string,
    @Req() req: any,
  ): Promise<Task[]> {
    if (+userId !== req.user.userId) {
      throw new ForbiddenException(
        'You are not allowed to view tasks of another user',
      );
    }

    return this.tasksService.findAllForUser(+userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({ status: 200, description: 'Task successfully retrieved.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async findOne(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<Task | null> {
    const task = await this.tasksService.findOne(+id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== req.user.userId) {
      throw new ForbiddenException('You are not allowed to view this task');
    }

    return task;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: any,
  ): Promise<Task> {
    const task = await this.tasksService.findOne(+id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== req.user.userId) {
      throw new ForbiddenException('You are not allowed to update this task');
    }

    return this.tasksService.updateTask(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async remove(@Param('id') id: string, @Req() req: any): Promise<Task> {
    const task = await this.tasksService.findOne(+id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.userId !== req.user.userId) {
      throw new ForbiddenException('You are not allowed to delete this task');
    }

    return this.tasksService.deleteTask(+id);
  }
}
