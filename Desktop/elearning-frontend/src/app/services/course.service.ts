import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { map, tap } from 'rxjs/operators';
import { CourseCategory } from '../models/course-category';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'https://elearning-cybersoft.herokuapp.com';
  constructor(private httpClient: HttpClient) { }

  getCourseMethod(){
    console.log("Successfully come to here");
    const courseUrl = `${this.baseUrl}/api/course`;
    return this.httpClient.get<GetCourses>(courseUrl).pipe(
      // tap(
      //   content => console.log("12312312", content),
      //   message => console.log("error", message)
      // )
      map(
        data => data.content
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

interface GetCourseCategory {
  content: CourseCategory[],
}