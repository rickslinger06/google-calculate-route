import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { DistanceCalculationComponent } from './component/distance-calculation/distance-calculation.component';
import { AppComponent } from './app.component';
import { GoogleMapsModule } from '@angular/google-maps';

import { BookingFormComponent } from './component/booking-form/booking-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter, CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';




@NgModule({
  declarations: [
    AppComponent,
    DistanceCalculationComponent,

    BookingFormComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: adapterFactory,
      },
      {
        dateFormatter: {
          provide: CalendarNativeDateFormatter,

        },
      }
    ),
  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
