import { TransformInterceptor } from '$core/customer-inreceptor.ys/transform.interceptor';
import { CustomerValidationPipe } from '$core/customer-pipe/customer.pipe';
import { HttpExceptionFilter } from '$core/filter/http-exception.filter';
import { LoggerMiddleware } from '$core/middlewares/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientModule } from './client/client.module';
import { JwtAuthGuard } from './shared/auth/jwt-auth.guard';
import { RolesGuard } from './shared/auth/role.guard';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './shared/scheduleTasks/task.module';
import { SmsModule } from './sms/sms.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: CustomerValidationPipe,
    },
  ],
  imports: [ClientModule, SharedModule, TasksModule, SmsModule, TypeOrmModule.forRoot(), ScheduleModule.forRoot()],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
