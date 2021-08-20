import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';

import { PaymentPageComponent } from './components/payment-page/payment-page.component';

import { CoverComponent } from './components/cover/cover.component';
import { IntroComponent } from './components/intro/intro.component';
import { PartnerComponent } from './components/partner/partner.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';

const routes: Routes = [
  {path: 'payment', component: PaymentPageComponent},
  {path: 'course-details', component: CourseDetailsComponent},
  {path: 'home', component: HomePageComponent},
  //empty path
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  //wildcard, if does not match any
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    CourseDetailsComponent,
    HomePageComponent,
    PaymentPageComponent,
    CoverComponent,
    IntroComponent,
    PartnerComponent,
    JobsComponent,
    FooterComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }