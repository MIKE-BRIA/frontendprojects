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
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; //[lat, lng]
    this.distance = distance; //in km
    this.duration = duration; //in min
  }

  _setdescription() {
    // prettier-ignore

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

//! Class Running

class Running extends workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setdescription();
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
    this._setdescription();
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
    // Get user's current location
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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

    L.marker(coords).addTo(this.#map).bindPopup('HOME.').openPopup();

    //*handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      // this._renderWorkout(work);
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    //* clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        ' ';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
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
    // console.log(workout);
    // console.log(this.#workouts);

    //*render workout on map as marker

    this._renderWorkoutMarker(workout);

    //*Render workout on list
    this._renderWorkout(workout);

    //*hide Form

    this._hideForm();

    //* set local storage to all workouts

    this._seLocalStorage();
  }

  //*Render workout on map as marker
  _renderWorkoutMarker(workout) {
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
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  //*Render Workout on list
  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
    `;

    if (workout.type === 'running') {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence.toFixed(1)}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `;
    }

    if (workout.type === 'cycling') {
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(0)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
      `;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // console.log(workout);

    this.#map.setView(workout.coords, 14, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // workout.click();
  }

  _seLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
