import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';

const routes: Routes = [
  {path: 'payment', component: PaymentPageComponent},
  {path: 'course-details', component: CourseDetailsComponent},
  {path: 'home', component: HomePageComponent},
  // //empty path
  // {path: '', redirectTo: '/home'},
  // //wildcard, if does not match any
  // {path: '**', redirectTo: '/home'}
];

@NgModule({
  declarations: [
    AppComponent,
    CourseDetailsComponent,
    HomePageComponent,
    PaymentPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }