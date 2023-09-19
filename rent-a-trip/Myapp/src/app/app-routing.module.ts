import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistanceCalculationComponent } from './component/distance-calculation/distance-calculation.component';

import { BookingFormComponent } from './component/booking-form/booking-form.component';




const routes: Routes = [

  { path: '', component: DistanceCalculationComponent },

  { path: 'booking', component: BookingFormComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
