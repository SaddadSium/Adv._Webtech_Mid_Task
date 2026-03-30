import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { extname } from 'path';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @Post()
  createCourse(@Body() createCoursedto: CreateCourseDto) {
    return this.courseService.createCourse(createCoursedto);
  }

  @Put(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() updateCoursedto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(id, updateCoursedto);
  }

  @Patch(':id')
  patchCourse(
    @Param('id') id: string,
    @Body() updateCoursedto: UpdateCourseDto,
  ) {
    return this.courseService.patchCourse(id, updateCoursedto);
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }

  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/i)) {
          return cb(
            new BadRequestException(
              'Only jpg, jpeg, png, and pdf files are allowed!',
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 6 * 1024 * 1024 },
    }),
  )
  uploadCourseMaterial(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'File is required and must be jpg, jpeg, png, or pdf!',
      );
    }
    return this.courseService.uploadCourseMaterial(id, file);
  }
}
