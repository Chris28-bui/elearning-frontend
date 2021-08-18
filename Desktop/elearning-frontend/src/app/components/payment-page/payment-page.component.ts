import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private paymentService: MonthAndYearService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.handleMonthsAndYears();

    this.paymentFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        province: new FormControl('', [Validators.required, Validators.minLength(1), InputValidator.notOnlyWhitespace]),
        country: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace])
      }),
      creditcard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2), InputValidator.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.pattern('[0-9]{16}'), Validators.required]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('0-9]{3}')]),
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
    const selectedYear: number = creditCardFormGroup?.value.expirationYear;

    // if the current year equals to the selected year, then start with current month
    let startMonth: number;

    if (currentYear === selectedYear)
      startMonth = new Date().getMonth();
    else 
      startMonth = 1;  


  }

  onSubmit() {}
  
  
  // Getter methods to get customer information
  get firstName() { return this.paymentFormGroup!.get('customer.firstName'); }
  get lastName() { return this.paymentFormGroup!.get('customer.lastName'); }
  get email() { return this.paymentFormGroup!.get('customer.email'); }

}

