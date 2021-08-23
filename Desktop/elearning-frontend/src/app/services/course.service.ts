import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courseUrl = 'https://elearning-cybersoft.herokuapp.com/swagger-ui.html#/course-controller/findAllCourseUsingGET';

  constructor(private httpClient: HttpClient) { }

  getCourseMethod(): Observable<Course[]> {
    console.log("Successfully come to here");
    return this.httpClient.get<GetResponseCourse>(this.courseUrl).pipe(
      map(response => response.content.courses)
    ); 
  }
}

interface GetResponseCourse {
  content: {
    courses: Course[];
  }
}