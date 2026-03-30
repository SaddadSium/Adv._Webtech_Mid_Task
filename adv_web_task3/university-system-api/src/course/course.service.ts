import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CourseService {
  private courses: any[] = [
    { id: 101, name: 'Introduction to Data Science', code: 'DS409' },
  ];
  private idCounter = 102;

  getAllCourses() {
    return {
      message: 'All courses fetched', data: this.courses,
    };
  }

  getCourseById(id: string | number) {
    const courseId = typeof id === 'string' ? parseInt(id, 10) : id;
    const course = this.courses.find((c) => c.id === courseId);
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return {
      message: 'Course fetched', data: course,
    };
  }
    createCourse(name: string, code: string) {
      const newCourse = { id: this.idCounter++, name, code };
      this.courses.push(newCourse);
      return {
        message: 'Course created', data: newCourse,
      };
    }
}

