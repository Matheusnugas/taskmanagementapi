import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsEnum,
  IsInt,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description of the task', required: false })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Due date of the task',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty({ description: 'Status of the task', enum: Status })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ description: 'ID of the user assigned to the task' })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
