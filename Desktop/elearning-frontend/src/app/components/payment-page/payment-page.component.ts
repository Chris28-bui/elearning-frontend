import { NgZone } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course } from 'src/app/models/course';
import { CourseItems } from 'src/app/models/course-items';
import { Payment } from 'src/app/models/payment';
import { CourseCartService } from 'src/app/services/course-cart.service';
import { CourseService } from 'src/app/services/course.service';
import { MonthAndYearService } from 'src/app/services/month-and-year.service';
import { PaymentService } from 'src/app/services/payment.service';
import { InputValidator } from 'src/app/validators/input-validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})

export class PaymentPageComponent implements OnInit {

  @ViewChild(NgScrollbar) scrollbarRef: NgScrollbar | undefined;
  unsubscriber$ = Subscription.EMPTY;
  size$ = new Subject();

  paymentFormGroup: FormGroup | undefined;

  creditCardMonth: number[] = [];
  creditCardYear: number[] = [];

  totalPrice: number = 0;
  totalQuantity: number = 0;
  courses: CourseItems[] = [];

  payment: Payment = new Payment();

  storage: Storage = localStorage;
  
  constructor(private paymentService: MonthAndYearService, private formBuilder: FormBuilder, private ngZone: NgZone, private courseCartService: CourseCartService, private userPaymentService: PaymentService, private router: Router) { }

  ngAfterViewInit() {
    // Subscribe to <ng-scrollbar> scroll event
    this.unsubscriber$ = this.scrollbarRef!.scrollable.elementScrolled().pipe(
      map((e: any) => e.target.scrollTop > 50 ? '0.75em' : '1em'),
      tap((size: string) => this.ngZone.run(() => this.size$.next(size)))
    ).subscribe();
  }
  
  ngOnDestroy() {
    this.unsubscriber$.unsubscribe();
  }

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
      }),
      checkboxToSave: this.formBuilder.group({
        checkToSave: new FormControl(false)
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

  onSubmit() {

    if (this.paymentFormGroup!.controls['checkboxToSave'].value) {
      this.payment.billingAddress = this.paymentFormGroup!.get('billingAddress.street')!.value + ", " + this.paymentFormGroup!.get('billingAddress.city')!.value + ", " + this.paymentFormGroup!.get('billingAddress.province')!.value + ", " + this.paymentFormGroup!.get('billingAddress.country')!.value + ", " + this.paymentFormGroup!.get('billingAddress.zipcode')!.value;
      // console.log("Object form: ", JSON.parse(tempAddress)) 
      this.payment.cardType = this.paymentFormGroup!.get('creditcard.cardType')!.value;
      this.payment.cardHolder = this.paymentFormGroup!.get('creditcard.nameOnCard')!.value;
      this.payment.cardNumber = this.paymentFormGroup!.get('creditcard.cardNumber')!.value;
      this.payment.cvv = this.paymentFormGroup!.get('creditcard.securityCode')!.value;

      let tempExpiredDate = this.paymentFormGroup!.get('creditcard.expirationMonth')!.value + "/" + this.paymentFormGroup!.get('creditcard.expirationYear')!.value;
      this.payment.dateExpired = tempExpiredDate;

      this.payment.email = this.paymentFormGroup!.get('customer.email')!.value;
      this.payment.user = this.paymentFormGroup!.get('customer.firstName')!.value + " " + this.paymentFormGroup!.get('customer.lastName')!.value;

      this.userPaymentService.savePaymentMethod(this.payment).subscribe(
        {

          // successful placeOrder
          next: response => {
            alert(`Your payment is added successfully.`);

            this.resetCard();
          },

          error: err => {
          alert(`There is an error: ${err.message}`)
        }
        },
      );


    }

  }

  resetCard() {
    // reset cart data
    this.courseCartService.totalPrice.next(0);
    this.courseCartService.totalQuantity.next(0);
    this.courseCartService.courseCart = [];

    this.storage.removeItem('cart item(s)');

    // reset the form
    this.paymentFormGroup?.reset();

    // navigate back to the main products page
    this.router.navigateByUrl("/home");
  }

  listCourses() {
    this.courses = this.courseCartService.courseCart;

    this.courseCartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.courseCartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    this.courseCartService.computeCartTotal()

  };

  findUser(keyword: String) {
    console.log("keyword ", keyword);
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

