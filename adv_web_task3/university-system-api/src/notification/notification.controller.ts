import { Body, Controller, Get, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getAllNotifications() {
    return this.notificationService.getAllNotifications();
  }

  @Post('send')
  sendNotification(@Body() body: { studentName: string; message: string }) {
    return this.notificationService.sendNotification(body.studentName, body.message);
  }

  @Post('check')
  checkEnrollmentNotification(@Body() body: { studentName: string; courseId: string }) {
    return this.notificationService.checkEnrollmentNotification(body.studentName, body.courseId);
  }

}
