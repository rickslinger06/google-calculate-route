import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/sevices/booking.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  showBooking!: boolean;
  calculatedDistanceInKm!: number;
  amountToPay!: number;

  constructor(private formBuilder: FormBuilder, private bookingService: BookingService) {
    this.bookingForm = this.formBuilder.group({
      date: ['', Validators.required],
      time: ['', Validators.required], // Add the time form control
      name: ['', Validators.required],
      price: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
  }

  submitBooking() {
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value;
      this.bookingForm.value.price = this.amountToPay;
      // Call the booking service to save the booking data

      console.log('Booking data:', bookingData);
      this.bookingService.book(bookingData).subscribe(
        (response: any) => {
          // Handle success, maybe show a success message
          console.log('Booking successful:', response);
        },
        error => {
          // Handle error, show an error message
          console.error('Booking failed:', error);
        }
      );
    }
  }

  receiveCalculatedData(data: any) {

    this.calculatedDistanceInKm = data.calculatedDistanceInKm;
    this.amountToPay = data.amountToPay;
  }
}
