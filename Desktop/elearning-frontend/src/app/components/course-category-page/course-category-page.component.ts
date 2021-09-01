import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course-category-page',
  templateUrl: './course-category-page.component.html',
  styleUrls: ['./course-category-page.component.css']
})
export class CourseCategoryPageComponent implements OnInit {

  courses: Course[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
