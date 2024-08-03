import { ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsEnum,
  IsInt,
} from 'class-validator';

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
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiPropertyOptional({ description: 'Status of the task', enum: Status })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({ description: 'ID of the user assigned to the task' })
  @IsOptional()
  @IsInt()
  userId?: number;
}
