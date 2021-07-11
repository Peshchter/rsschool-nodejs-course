import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from '../resources/boards/boards.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../resources/users/users.module';
import { config } from '../common/ormconfig';

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
