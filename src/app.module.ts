import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersController } from './controllers/users/users.controller';
import { TasksController } from './controllers/tasks/tasks.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersService } from './services/users/users.service';
import { TasksService } from './services/tasks/tasks.service';
import { AuthService } from './services/auth/auth.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsersController, TasksController, AuthController],
  providers: [
    UsersService,
    TasksService,
    AuthService,
    PrismaService,
    JwtStrategy,
  ],
})
export class AppModule {}
