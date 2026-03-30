import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EnrollmentService } from '../enrollment/enrollment.service';


@Injectable()
export class NotificationService {
  private notifications: any[] = [];
  private idCounter = 1;

  constructor(
    @Inject(forwardRef(() => EnrollmentService))
    private readonly enrollmentService: EnrollmentService,
  ) {}

  sendNotification(studentName: string, message: string) {
    const newNotification = { id: this.idCounter++, studentName, content: message, timestamp: new Date().toISOString() };
    this.notifications.push(newNotification);
    return {
      message: 'Notification sent successfully', data: newNotification,
    };
  }

  getAllNotifications() {
    return {
      message: 'All notifications fetched', data: this.notifications,
    };
  }

  checkEnrollmentNotification(studentName: string, courseId: string) {
    const enrollmentsResponse = this.enrollmentService.getEnrollments();
    return {
      status: 'Checked',
      studentName,
      courseId,
      enrollments: enrollmentsResponse.data,
    };
  }
}
