import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Status } from '@prisma/client';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'Title of the task' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Description of the task' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Due date of the task',
    example: '01/07/2025',
  })
  @IsOptional()
  @IsString()
  dueDate?: string;

  @ApiPropertyOptional({ description: 'Status of the task' })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
