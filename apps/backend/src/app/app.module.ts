import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_FILE_PATH } from './app.constant';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from './config/database.config';
import { getMongoDbConfig } from './config/mongodb.config';
import envSchema from './env.schema';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig],
      validationSchema: envSchema,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    UsersModule,
    ProductsModule,
    CommentsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService, OrdersService],
})
export class AppModule {}
