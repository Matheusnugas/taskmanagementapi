import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsNotEmpty()
  name: string;
}
