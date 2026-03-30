import { forwardRef, Module } from '@nestjs/common';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';
import { CourseModule } from '../course/course.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService],
  imports: [ CourseModule, forwardRef(() => NotificationModule) ],
})
export class EnrollmentModule {}
