import { Component, OnInit } from '@angular/core';
import { CourseCategory } from 'src/app/models/course-category';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent implements OnInit {

  courseCategory: CourseCategory[] = [];
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getCourseCategory();
  }

  getCourseCategory() {
    this.courseService.getCourseCategoryMethod().subscribe(
      this.handleResult()
    );
  }

  handleResult(){
    return ((data: any) => {
      this.courseCategory = data;
    })
  }
}
