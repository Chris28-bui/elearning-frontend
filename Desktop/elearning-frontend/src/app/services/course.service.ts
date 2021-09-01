import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { map, tap } from 'rxjs/operators';
import { ModalOptions } from 'angular-bootstrap-md';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { MESSAGES_CONTAINER_ID } from '@angular/cdk/a11y';
import { CourseItems } from '../models/course-items';
import { CourseCategory } from '../models/course-category';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courseUrl = 'https://elearning-cybersoft.herokuapp.com';
  private baseUrl = 'https://elearning-cybersoft.herokuapp.com';
  log: any;

  constructor(private httpClient: HttpClient) { }

  getCourseMethod(): Observable<Course[]> {
    const searchUrl = `${this.courseUrl}/api/course`;

    return this.httpClient.get<GetCourses>(searchUrl).pipe(
      map(
        data => data.content,
      )
    );
  }

  getCourseUsingCourseId(courseId: number): Observable<Course> {
    
    const searchUrl = `${this.courseUrl}/api/course/${courseId}`;

    return this.httpClient.get<GetCourse>(searchUrl).pipe(
      map (
        data => data.content,
      )
    );
    }    

  getCourseCategoryMethod(){
    const courseCategoryUrl = `${this.baseUrl}/api/course/category`;
    return this.httpClient.get<GetCourseCategory>(courseCategoryUrl).pipe(
      map(
        data => data.content
      )
    );
  }
}

interface GetCourses {
  content: Course[],
}

interface GetCourse {
  content: Course;
}


interface GetCourseCategory {
  content: CourseCategory[],
}
