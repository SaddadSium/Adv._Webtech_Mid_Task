import { forwardRef, Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { EnrollmentModule } from '../enrollment/enrollment.module';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
  imports: [ forwardRef(() => EnrollmentModule) ],
})
export class NotificationModule {}
