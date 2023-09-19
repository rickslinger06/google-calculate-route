import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private events: CalendarEvent[] = [];

  constructor() {
    // Initialize events (you can load this from a backend API)
    this.events = [
      {
        start: new Date(), // Replace with your event start date
        title: 'Example Event',
        color: {
          primary: '#1e90ff',
          secondary: '#D1E8FF'
        }
      }
    ];
  }

  // Simulate booking a date and adding it to the events array
  book(bookingData: any): Observable<any> {
    const newEvent: CalendarEvent = {
      start: bookingData.date, // Assuming you have a date property in bookingData
      title: bookingData.name, // Use the name as the event title
      color: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      }
    };

    // Push the new event to the events array
    this.events.push(newEvent);

    // You might want to send this data to a backend API for persistence

    return of({ message: 'Booking successful' }); // Simulate a successful response
  }

  // Get all events
  getEvents(): Observable<CalendarEvent[]> {
    return of(this.events);
  }
}
