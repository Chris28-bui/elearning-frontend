import { User } from "./user";

export class Course {

    courseImg: String = "";
    courseName: String = "";
    price: number = 0;
    courseInstructor: User = new User();
    rating: number = 0.0;
}
