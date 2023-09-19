import { Component, OnInit, NgZone, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-distance-calculation',
  templateUrl: './distance-calculation.component.html',
  styleUrls: ['./distance-calculation.component.css'],
})
export class DistanceCalculationComponent implements OnInit {
  @Output() calculatedDataEmitter = new EventEmitter<any>();
  map!: google.maps.Map;
  originAddress: string = ''; // Input field for origin address
  destinationAddress: string = ''; // Input field for destination address
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
  distanceText: string = ''; // Variable to store the calculated distance
  setAmountPerKmCharge = 40;
  calculatedDistanceInKm = 0;
  amountToPay: number = 0;


  constructor(private ngZone: NgZone, private router: Router) {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.originAddress = '';
    this.destinationAddress = '';
  }

  ngOnInit() {
    this.initMap();
    this.useCurrentLocation();
    this.setupPlaceAutocomplete();

  }

  useCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Use the Geocoding service to convert coordinates to a readable address
      const geocoder = new google.maps.Geocoder();
      const latLng = new google.maps.LatLng(lat, lng);

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
          //use the first result as the address
          this.originAddress = results[0].formatted_address;
        } else {
          console.error('Geocoding failed for coordinates:', lat, lng);
          this.originAddress = 'Address not found';
        }
      });
    });
  }


  initMap() {
    console.log('Initializing the map...');
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 10.6713, lng: 122.9511 },
      zoom: 11,
    });

    this.directionsRenderer.setMap(this.map);
  }



  calculateDistance() {
    if (!this.originAddress || !this.destinationAddress) {
      alert('Please provide both origin and destination addresses.');
      return;
    }



    Swal.fire({
      title: 'Calculating...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }

    });

    this.geocodeAddress(this.originAddress, (originLatLng) => {
      this.geocodeAddress(this.destinationAddress, (destLatLng) => {
        const request: google.maps.DirectionsRequest = {
          origin: originLatLng,
          destination: destLatLng,
          travelMode: google.maps.TravelMode.DRIVING,
        };
        this.directionsService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.directionsRenderer.setDirections(result);
            if (result && result.routes && result.routes.length > 0) {
              const route = result.routes[0];
              if (route.legs && route.legs.length > 0) {
                const distanceInMiles = route.legs[0].distance ? parseFloat(route.legs[0].distance.text) : 0;
                this.calculatedDistanceInKm = distanceInMiles * 1.60934;
                this.amountToPay = this.calculatedDistanceInKm * this.setAmountPerKmCharge;

                const calculatedData = {
                  calculatedDistanceInKm: this.calculatedDistanceInKm,
                  amountToPay: this.amountToPay,
                };
                this.calculatedDataEmitter.emit(calculatedData);

                Swal.close();
                this.router.navigate(['/booking']);

              } else {
                this.distanceText = 'Route information not available';
              }
            } else {
              this.distanceText = 'No route information available';
            }
          } else {
            console.error('Directions request failed with status:', status);
            this.distanceText = 'Error calculating distance';
          }

        });
      });
    });

  }


  geocodeAddress(address: string, callback: (latLng: google.maps.LatLng) => void) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
        const location = results[0].geometry.location;
        callback(location);
      } else {
        console.error('Geocoding failed for address:', address);
      }
    });
  }

  setupPlaceAutocomplete() {
    const originInput = document.getElementById('originAddress') as HTMLInputElement;
    const destinationInput = document.getElementById('destinationAddress') as HTMLInputElement;

    const originAutocomplete = new google.maps.places.Autocomplete(originInput);
    const destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);

    originAutocomplete.setFields(['place_id', 'formatted_address', 'geometry']);
    destinationAutocomplete.setFields(['place_id', 'formatted_address', 'geometry']);

    originAutocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = originAutocomplete.getPlace();
        this.originAddress = place.formatted_address as string;
        originInput.value = place.formatted_address as string; // Set the input value to the selected address
      });
    });

    destinationAutocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = destinationAutocomplete.getPlace();
        this.destinationAddress = place.formatted_address as string;
        destinationInput.value = place.formatted_address as string; // Set the input value to the selected address
      });
    });
  }

}

