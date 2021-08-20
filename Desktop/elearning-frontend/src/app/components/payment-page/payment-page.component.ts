import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';
import { MonthAndYearService } from 'src/app/services/month-and-year.service';
import { InputValidator } from 'src/app/validators/input-validator';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  paymentFormGroup: FormGroup | undefined;

  creditCardMonth: number[] = [];
  creditCardYear: number[] = [];

  totalPrice: number = 0;
  totalQuantity: number = 0;
  courses: Course[] = [];
  

  constructor(private paymentService: MonthAndYearService, private formBuilder: FormBuilder, private courseService: CourseService) { }

  ngOnInit(): void {

    this.listCourses();
    this.handleMonthsAndYears();

    this.paymentFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(10), InputValidator.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        province: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        country: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        zipcode: new FormControl('', [Validators.required])
      }),
      creditcard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, InputValidator.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.pattern('[0-9]{16}'), Validators.required]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth: [''],
        expirationYear: [''],
      })
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    this.paymentService.creditCardMonth(startMonth).subscribe(
      data => {
        this.creditCardMonth = data;
      }
    )

    // populate credit card years
    this.paymentService.creditCardYear().subscribe(
      data => {
        this.creditCardYear = data;
      }
    )
 
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.paymentFormGroup?.get('creditcard')

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    // if the current year equals to the selected year, then start with current month
    let startMonth!: number;

    if (currentYear === selectedYear)
      startMonth = new Date().getMonth() + 1;
    else 
      startMonth = 1;  

    this.paymentService.creditCardMonth(startMonth).subscribe(
      data => {
        this.creditCardMonth = data;
      }
    )  


  }

  onSubmit() {}

  listCourses() {
    this.courseService.getCourseMethod().subscribe(
      data => {
        console.log("Course List: " + data)
        this.courses = data;
        
      }
    )
  }
  
  
  // Getter methods to get customer information
  get firstName() { return this.paymentFormGroup!.get('customer.firstName'); }
  get lastName() { return this.paymentFormGroup!.get('customer.lastName'); }
  get email() { return this.paymentFormGroup!.get('customer.email'); }

  // Getter methods to get billing address
  get street() { return this.paymentFormGroup!.get('billingAddress.street'); }
  get city() { return this.paymentFormGroup!.get('billingAddress.city'); }
  get province() { return this.paymentFormGroup!.get('billingAddress.province'); }
  get country() { return this.paymentFormGroup!.get('billingAddress.country'); }
  get zipcode() { return this.paymentFormGroup!.get('billingAddress.zipcode'); }

  // Getter methods to get credit card information
  get cardType() { return this.paymentFormGroup!.get('creditcard.cardType'); }
  get nameOnCard() { return this.paymentFormGroup!.get('creditcard.nameOnCard'); }
  get cardNumber() { return this.paymentFormGroup!.get('creditcard.cardNumber'); }
  get securityCode() { return this.paymentFormGroup!.get('creditcard.securityCode'); }
  get expirationMonth() { return this.paymentFormGroup!.get('creditcard.expirationMonth'); }
  get expirationYear() { return this.paymentFormGroup!.get('creditcard.expirationYear'); }

}

