import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentUrl  = 'https://elearning-cybersoft.herokuapp.com/api/payment';

  constructor(private httpClient: HttpClient) { }

  savePaymentMethod(payment: Payment): Observable<any> {

    return this.httpClient.post<Payment>(this.paymentUrl, payment);

  }
}
