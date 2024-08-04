import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the task', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Due date of the task', example: '01/07/2025' })
  @IsNotEmpty()
  @IsString()
  dueDate: string;

  @ApiProperty({ description: 'Status of the task' })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ description: 'User ID to whom the task is assigned' })
  @IsNotEmpty()
  userId: number;
}
