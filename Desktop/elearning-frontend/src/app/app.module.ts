import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CoverComponent } from './components/cover/cover.component';
import { IntroComponent } from './components/intro/intro.component';
import { PartnerComponent } from './components/partner/partner.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
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
    CoverComponent,
    IntroComponent,
    PartnerComponent,
    JobsComponent,
    FooterComponent,
    CarouselComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    CarouselModule,
    BrowserAnimationsModule
    // OwlCarousel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
