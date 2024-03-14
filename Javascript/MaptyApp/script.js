'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//*Using geonavigation api
// let map, mapEvent;
//! Class Workout
class workout {
  date = new Date();
  //*ID
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; //[lat, lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }
}

//! Class Running

class Running extends workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    //min/km

    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

//! Class Cycling
class Cycling extends workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }

  calcSpeed() {
    //km/h

    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

//! APPLICATION ARCHITECTURE
//! Class of App
class App {
  #map;
  #mapEvent;
  #workouts = [];
  constructor() {
    //*Initialize the app loading when object is created
    this._getPosition();

    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  //*getting position of the current user

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert('Could not get your position');
      }
    );
  }

  //*loading the map
  _loadMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    console.log(this);
    this.#map = L.map('map').setView(coords, 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords)
      .addTo(this.#map)
      .bindPopup('DEAD ZONE.<br> Please do not cross.')
      .openPopup();

    //*handling clicks on map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    //function for input validation
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));
    //function to check positive values
    const allPositives = (...inputs) => inputs.every(input => input > 0);
    //*Get data from the form

    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;

    //*If workout is running, create a running object
    let workout;

    if (type === 'running') {
      const cadence = +inputCadence.value;
      //*Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositives(distance, duration, cadence)
      ) {
        alert('Inputs have to be positive values');
        return;
      }

      workout = new Running([lat, lng], distance, duration, cadence);
      // this.#workouts.push(workout);
    }

    //*If workout is cycling, create a cycling object

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      //*Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositives(distance, duration)
      ) {
        alert('Inputs have to be positive values');
        return;
      }

      workout = new Cycling([lat, lng], elevation, duration, elevation);
      // this.#workouts.push(workout);
    }
    //*Add the object to workout array

    this.#workouts.push(workout);
    console.log(workout);
    console.log(this.#workouts);

    //*render workout on map as marker

    this.renderWorkoutMarker(workout);

    //*Render workout on list

    //*Hide the form + clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        ' ';
  }

  //*Render workout on map as marker
  renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent('workout.distance')
      .openPopup();
  }
}

const app = new App();
