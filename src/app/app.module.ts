import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../resources/users/users.module';
import { BoardsModule } from 'resources/boards/boards.module';
import { config } from '../common/ormconfig';
import { LoginController } from 'resources/login/login.controller';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TypeOrmModule.forRoot(config)],
  controllers: [AppController, LoginController],
  providers: [AppService],
})
export class AppModule {}
