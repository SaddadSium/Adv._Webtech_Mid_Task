import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class EnrollmentService {
  private enrollments: any[] = [];
  private idCounter = 1;

  constructor(
    private readonly courseService: CourseService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService,
  ) {}

  enrollStudent(studentName: string, courseId: string) {
    const course = this.courseService.getCourseById(courseId);
    const newEnrollment = { id: this.idCounter++, student: studentName, course: course.data,
      date: new Date().toISOString()
     };
    this.enrollments.push(newEnrollment);
    this.notificationService.sendNotification(
      studentName,
      'Successfully enrolled in course: ${courseResponse.data.name}',
    );
    return {
      message: 'Student enrolled successfully', data: newEnrollment,
    };
  }

  getEnrollments() {
    return {
      message: 'All enrollments fetched', data: this.enrollments,
    };
  }
}

