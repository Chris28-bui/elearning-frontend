import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  // private courseUrl = 'https://elearning-cybersoft.herokuapp.com/swagger-ui.html#/course-controller/findAllCourseUsingGET';
  // private courseUrl = 'http://localhost:8089/api/course';
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

  // getCourseMethod(): Observable<Course[]>{
  //   return this.httpClient.get<GetResponseCourse>(this.courseUrl).pipe(
  //     map(response => response.content.courses)
  //   );
  // }
}

interface GetCourses {
  content: Course[],
}
