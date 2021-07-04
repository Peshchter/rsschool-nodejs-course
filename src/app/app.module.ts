import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../resources/users/users.module';
import { BoardsModule } from 'resources/boards/boards.module';
import { config } from '../common/ormconfig';
//import { User } from "../resources/users/user.model";

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // constructor(private connection: Connection) {}
}
