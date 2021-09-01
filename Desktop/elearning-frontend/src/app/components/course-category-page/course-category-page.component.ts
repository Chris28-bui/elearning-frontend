import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CourseCategoryService } from 'src/app/services/course-category.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-category-page',
  templateUrl: './course-category-page.component.html',
  styleUrls: ['./course-category-page.component.css']
})
export class CourseCategoryPageComponent implements OnInit {

  courses: Course[] = [];
  courseCategory!: String; 
  courseId!: number;
 

  constructor(private courseCategoryService: CourseCategoryService, private router: ActivatedRoute, private route: Router, private courseService: CourseService) { }

  ngOnInit(): void {

    this.getCourseByCourseCategory()
  }

  getCourseByCourseCategory() {
    this.courseCategory = this.router.snapshot.paramMap.get('name')!;

    this.courseCategoryService.getCourseByCourseCategory(this.courseCategory).subscribe(
      data => {
        this.courses = data;
      }
    )
  }

  getCourseName() {
    
    const courseName = this.router.snapshot.paramMap.get('name')!;

    this.courseCategoryService.getCourseByCourseName(courseName).subscribe(
      data => {
        this.courseId = data.id;
      }
    )
  }

  goToCourseDetail(courseName: String, courseInstructor: String) {

    let tempCourse!: Course;

    this.courseService.getCourseByNameAndInstructor(courseName, courseInstructor).subscribe(
      data => {
        this.route.navigateByUrl(`/course-detail/${data.id}`)
      }
    )

    // console.log(tempCourse);
    
  }
}
